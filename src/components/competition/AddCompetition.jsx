import { Input, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import { Editor } from 'tinymce';
import { add_competition } from '../api_fetch'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from 'sweetalert2'

export default function AddCompetition() {

  const [image_avatar, setImage_avatar] = useState()
  const [image_show, setImage_show] = useState()

  const [competition, setCompetition] = useState({
    name: '',
    is_active: '',
    price: '',
    start_date: '',
    end_date: '',
    duration: '',
    image: '',
    background: '',
    full_description: '<p></p>'
  })

  async function competition_add(e) {

    const fd = new FormData()
    if (competition.name.length > 3 && image_avatar) {
      fd.append('image', image_avatar)
    }
    fd.append('name', competition.name)
    fd.append('is_active', competition.is_active)
    fd.append('start_date', competition.start_date)
    fd.append('end_date', competition.end_date)
    fd.append('duration', competition.duration)
    fd.append('full_description', competition.full_description)
    try {
      e.preventDefault()
      const result = await add_competition(fd)
      console.log(result);
      Swal.fire(
        'Success',
        'You entered successfully',
        'success'
      )
      clear()
    } catch (error) {
      console.log(error);
    }
  }



  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage_show(URL.createObjectURL(event.target.files[0]));
    }
  }

  function clear() {
    setCompetition({
      name: '',
      is_active: '',
      price: '',
      start_date: '',
      end_date: '',
      duration: '',
      image: '',
      background: '',
      full_description: '<p></p>'
    })
  }

  return (
    <div>
      <div className="container">
        <h5 className='text-center mt-4'>Create competition</h5>
        <div>
          <form className='row'>
            <div className="mb-3 col-6">
              <div>
                <label htmlFor="name" className="form-label">Name competition</label>
                <input type="text" id="name" className="form-control" placeholder='Name'
                 value={competition?.name}
                  onChange={(e) => { setCompetition({ ...competition, [e.target.id]: e.target.value }) }}
                  required minLength={3} />
              </div>
              <label htmlFor="is_active" className="form-label mt-2">Status</label>
              <select className="form-select" id='is_active' aria-label="Default select example" value={competition?.is_active}
                onChange={(e) => { setCompetition({ ...competition, [e.target.id]: e.target.value }) }}>
                <option>Choose one</option>
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
            </div>
            {console.log(competition)}
            <div className="mb-3 col-6">
              <label htmlFor="image" className="form-label">
                <label htmlFor="" className='form-label'>Image</label>
                <div>
                  <div className='d-none' style={{ height: '100px', overflow: 'hidden', border: '1px solid #a1a1a1', width: '200px', borderRadius: '20px' }}>
                    <h6 style={{ paddingLeft: '25px', paddingTop: '40px' }}>Image</h6>
                  </div>
                  <div style={{ height: '100px', border: '1px solid #a1a1a1', overflow: 'hidden', width: '200px', borderRadius: '20px' }}>
                    <img src={image_show} className='w-100' alt="" />
                  </div>
                </div>
              </label>
              <input type="file" id="image" className="form-control d-none" placeholder='991234567'
                onChange={(e) => { setImage_avatar(e.target.files[0]); console.log(e.target.value); onImageChange(e) }}
                required minLength={3} />
            </div>

            <div className="mb-3 col-md-3 col-6 pt-4">
              <TextField
                id="start_date"
                label="Beginning appointment"
                type="datetime-local"
                value={competition?.start_date}
                size='small'
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setCompetition({ ...competition, [e.target.id]: e.target.value });
                  console.log(e.target.value)
                }}
                sx={{ width: '100%' }}
              />
            </div>
            <div className="mb-3 col-md-3 col-6 pt-4">
              <TextField
                id="end_date"
                label="Finishing  appointment"
                type="datetime-local"
                value={competition?.end_date}
                size='small'
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setCompetition({ ...competition, [e.target.id]: e.target.value });
                  console.log(e.target.value)
                }}
                sx={{ width: '100%' }}
              />
            </div>

            <div className="mb-3 col-md-3 col-6">
              <label htmlFor="duration" className="form-label">Duration</label>
              <input type="number" id="duration" className="form-control" placeholder='30'
                value={competition?.duration}
                onChange={(e) => { setCompetition({ ...competition, [e.target.id]: e.target.value }) }}
                required />
            </div>
            <div className="mb-3 col-md-3 col-6">
              <label htmlFor="price" className="form-label">Price</label>
              <input type="text" id="price" className="form-control" placeholder='5600'
                value={competition?.price}
                onChange={(e) => { setCompetition({ ...competition, [e.target.id]: e.target.value }) }}
                required minLength={3} />
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
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3" onClick={(e) => { competition_add(e) }}>Create competition</button>
          </form>
        </div>
      </div>
    </div>
  )
}