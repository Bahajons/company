import { Input, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useRef, useState } from 'react'
import { Editor } from 'tinymce';
import { delete_competition, get_detail_competition, patch_detail_competition } from '../utils/api_fetch'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';


export default function EditCompetition() {


  const { slug } = useParams()
  const navigate = useNavigate()
  const [disabled, setDisabled] = useState(true)
  const [image, setImage] = useState()
  const [image_show, setImage_show] = useState()
  const [competition, setCompetition] = useState({
    name: '',
    is_active: '',
    price: '',
    start_date: '',
    end_date: '',
    duration: '',
    image: '',
    full_description: '<p></p>'
  })


  async function get_competition_detail() {
    try {

      const { data } = await get_detail_competition(slug);
      console.log(data);
      setCompetition({ ...competition, ...data })
    } catch (error) {
      console.log(error);
    }
  }


  async function update_competition(e) {

    const fd = new FormData()
    if (image) {
      fd.append('image', image)
    }
    fd.append('name', competition?.name)
    fd.append('is_active', competition?.is_active)
    fd.append('price', competition?.price)
    fd.append('start_date', competition?.start_date)
    fd.append('end_date', competition?.end_date)
    fd.append('duration', competition?.duration)
    fd.append('full_description', competition?.full_description)
    try {
      e.preventDefault()
      const result = await patch_detail_competition(slug, fd)
      console.log(result);
      setDisabled(true)
      Swal.fire(
        'Success',
        'Competition updated',
        'success'
      )
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    get_competition_detail()
  }, [])

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage_show(URL.createObjectURL(event.target.files[0]));
    }
  }
  // function clear() {
  //   setCompetition({
  //     name: '',
  //     is_active: '',
  //     price: '',
  //     start_date: '',
  //     end_date: '',
  //     duration: '',
  //     image: '',
  //     background: '',
  //     full_description: '<p></p>'
  //   })
  //   setImage()
  // }

  async function del_competition() {
    try {
      const result = await delete_competition(slug)
      console.log(result);
      navigate(-1)
      Swal.fire(
        'Success',
        'Deleted successfully',
        'success'
      )
    } catch (error) {
      console.log(error);
    }
  }




  return (
    <div>
      <div className="container">
        <h5 className='text-center mt-4'>Edit competition</h5>
        <div>
          {competition.name ?
            <form className='row'>
              {console.log(competition)}
              <div className="mb-3 col-6">
                <div>
                  <label htmlFor="name" className="form-label">Name competition</label>
                  <input type="text" id="name" className="form-control" placeholder='Name'
                    defaultValue={competition?.name}
                    onChange={(e) => { setCompetition({ ...competition, [e.target.id]: e.target.value }) }}
                    required minLength={3} disabled={disabled} />
                </div>
                <label htmlFor="is_active" className="form-label mt-2">Status</label>
                <select className="form-select" id='is_active' aria-label="Default select example"
                  onChange={(e) => { setCompetition({ ...competition, [e.target.id]: e.target.value }) }}
                  defaultValue={competition.is_active} disabled={disabled}>
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </select>
              </div>
              {console.log(competition)}
              <div className="mb-3 col-6">
                <label htmlFor="image" className="form-label">
                  <label htmlFor="" className='form-label'>Image</label>
                  <div>
                    {image_show ?
                      <div style={{ height: '100px', border: '1px solid #a1a1a1', overflow: 'hidden', width: '200px', borderRadius: '20px' }}>
                        <img src={image_show} className='w-100' alt="" />
                      </div>
                      : competition?.image ?
                        <div style={{ height: '100px', border: '1px solid #a1a1a1', overflow: 'hidden', width: '200px', borderRadius: '20px' }}>
                          <img src={competition?.image} className='w-100' alt="" />
                        </div> :
                        <div style={{ height: '100px', overflow: 'hidden', border: '1px solid #a1a1a1', width: '200px', borderRadius: '20px' }}>
                          <h6 style={{ paddingLeft: '15px', paddingTop: '40px' }}>No image</h6>
                        </div>}
                  </div>
                </label>
                <input type="file" id="image" className="form-control d-none" placeholder='991234567'
                  onChange={(e) => { setImage(e.target.files[0]); console.log(e.target.value); onImageChange(e) }}
                  minLength={3} disabled={disabled} />
              </div>

              <div className="mb-3 col-md-3 col-6 pt-4">
                <TextField
                  id="start_date"
                  label="Beginning appointment"
                  type="datetime-local"
                  defaultValue={competition?.start_date}
                  size='small'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    setCompetition({ ...competition, [e.target.id]: e.target.value });
                    console.log(e.target.value)
                  }}
                  disabled={disabled}
                  sx={{ width: '100%' }}
                />
              </div>
              <div className="mb-3 col-md-3 col-6 pt-4">
                <TextField
                  id="end_date"
                  label="Finishing  appointment"
                  type="datetime-local"
                  defaultValue={competition?.end_date}
                  size='small'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    setCompetition({ ...competition, [e.target.id]: e.target.value });
                    console.log(e.target.value)
                  }}
                  sx={{ width: '100%' }}
                  disabled={disabled}
                />
              </div>
              <div className="mb-3 col-md-3 col-6">
                <label htmlFor="duration" className="form-label">Duration(min)</label>
                <input type="number" id="duration" className="form-control" placeholder='30'
                  value={competition?.duration}
                  onChange={(e) => { setCompetition({ ...competition, [e.target.id]: e.target.value }) }} disabled={disabled} />
              </div>
              <div className="mb-3 col-md-3 col-6">
                <label htmlFor="price" className="form-label">Price(so'm)</label>
                <input type="text" id="price" className="form-control" placeholder='5600'
                  value={competition?.price}
                  onChange={(e) => { setCompetition({ ...competition, [e.target.id]: e.target.value }) }} disabled={disabled} />
              </div>

              <div>
                <label htmlFor="full_description">Full description</label>
                <CKEditor
                  editor={ClassicEditor}
                  id="full_description"
                  data={competition?.full_description}
                  onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setCompetition({ ...competition, full_description: data })
                    console.log({ data });
                  }}
                  onBlur={(event, editor) => {
                    // console.log('Blur.', editor);
                  }}
                  onFocus={(event, editor) => {
                    // console.log('Focus.', editor);
                  }}
                  disabled={disabled}
                />
              </div>

              {disabled ? <button type='button' className='btn mt-3 btn-primary' style={{ fontSize: '16px' }} onClick={(e) => { setDisabled(false); e.preventDefault() }}><EditIcon style={{ fontSize: '18px' }} /> Edit</button>
                :
                <button type="submit" className="btn btn-primary w-100 mt-3" onClick={(e) => { update_competition(e) }}>Update competition</button>}
              <button type="button" className="btn btn-danger w-100 mt-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <DeleteIcon style={{ fontSize: '18px' }} />Delete competition</button>


            </form> :
            <p>Loading...</p>}


        </div>
      </div>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title text-center fs-5" id="staticBackdropLabel">Really do you want to delete it</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="d-flex justify-content-center">
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={(e) => { del_competition(e) }}>Yes</button>
                <button type="button" className="btn btn-warning">No</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
