import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import { get_profile, update_profile } from '../utils/api_fetch';
import { useNavigate } from 'react-router-dom';
import { Profile_style } from '../../styleComponent/User';
import Swal from 'sweetalert2'

export default function Profile() {

  const navigate = useNavigate()
  const [disabled, setDisabled] = useState(true)
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    middle_name: '',
    gender: '',
    birthday: '',
    avatar: '',
    phone: '',
    address: '',
    region: '',
    city: ''
  })
  const [error, setError] = useState()
  const [check, setCheck] = useState(false)
  const [image_avatar, setImage_avatar] = useState()
  const [image_show, setImage_show] = useState()

  async function profile_get() {
    try {
      const result = await get_profile()
      console.log(result);
      setUser({ ...user, ...result?.data })
    } catch (error) {
      console.log(error);
      if (error.response.status == 401) {
        Swal.fire(
          'Unauthorized',
          'You should login',
          'error'
        )
        navigate('/login')
      }
    }
  }




  async function profile_update(e) {

    if (user.first_name && user.last_name && user.middle_name) {
      e.preventDefault()
      const fd = new FormData()
      if (image_avatar) {
        fd.append('avatar', image_avatar, image_avatar?.name)
      }
      fd.append('first_name', user.first_name)
      fd.append('last_name', user.last_name)
      fd.append('middle_name', user.middle_name)
      fd.append('gender', user.gender)
      fd.append('birthday', user.birthday)
      fd.append('phone', user.phone)
      fd.append('address', user.address)
      // fd.append('region', user.region)
      // fd.append('city', user.city)

      { console.log(fd); }
      try {
        const result = await update_profile(fd)
        console.log(result);
        Swal.fire(
          'Success',
          'Your profile updated',
          'success'
        )
        clear()
        profile_get()
      } catch (error) {
        e.preventDefault()
        console.log(error);
        if (error.response.status == 401) {
          Swal.fire(
            'Unauthorized',
            'You should login',
            'error'
          )
          navigate('/login')
        }
      }
    }
  }



  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage_show(URL.createObjectURL(event.target.files[0]));
    }
  }


  function clear() {
    setDisabled(true)
    setImage_show()
    setImage_avatar()
    setUser({
      ...user, ...{
        first_name: '',
        last_name: '',
        middle_name: '',
        gender: '',
        birthday: '',
        avatar: '',
        phone: '',
        address: '',
        region: '',
        city: ''
      }
    })

  }


  useEffect(() => {
    profile_get()

  }, [])



  return (
    <Profile_style>
      <div className="container">
        <div className='col-md-8 offset-md-2'>
          <h5 className='text-center'>Profile</h5>
          {user.first_name ?
            <form className='row'>
              {/* //name */}
              <div className="mb-3 col-6">
                <div className='avatar'>
                  {image_show ?
                    <img src={image_show} className='w-100' alt="" />
                    :
                    user?.avatar ?
                      <img src={user.avatar} className='w-100' alt="" />
                      :
                      <div className='image'>
                        <PersonIcon className='person' />
                      </div>
                  }
                  {/* <img src="./img/img.jpg" className='w-100' alt="" /> */}

                  <label htmlFor="avatar">
                    {disabled ? '' :
                      <EditIcon className='icon' />
                    }
                  </label>
                </div>
                <input type="file" id='avatar' onChange={(e) => { setImage_avatar(e.target.files[0]); onImageChange(e) }} className='d-none col-6' disabled={disabled} />
              </div>
              {console.log(user)}
              {/* //name */}
              <div className="mb-3 col-6">
                <div className='edit d-flex justify-content-end'>
                  {disabled ? <button type='button' className='btn btn-primary' style={{ fontSize: '16px' }} onClick={() => setDisabled(false)}><EditIcon style={{ fontSize: '18px' }} /> Edit</button> : ''}
                </div>

                <label htmlFor="first_name" className="form-label">Name</label>
                <input type="text" className="form-control" id="first_name" aria-describedby="emailHelp" placeholder='Azizbek'
                  minLength={3}
                  defaultValue={user.first_name}
                  onChange={(e) => { setUser({ ...user, [e.target.id]: e.target.value }) }}
                  required disabled={disabled} />
                {console.log(user)}
              </div>
              {/* //surname */}
              <div className="mb-3 col-6">
                <label htmlFor="last_name" className="form-label">Surname</label>
                <input type="text" className="form-control" id="last_name" placeholder='Botirov'
                  defaultValue={user.last_name} minLength={3}
                  onChange={(e) => { setUser({ ...user, [e.target.id]: e.target.value }) }} required disabled={disabled} />
              </div>
              {/* middle name */}
              <div className="mb-3 col-6">
                <label htmlFor="middle_name" className="form-label">Middle name</label>
                <input type="text" className="form-control" id="middle_name" placeholder='Botirov'
                  defaultValue={user.middle_name} minLength={3}
                  onChange={(e) => { setUser({ ...user, [e.target.id]: e.target.value }) }} required disabled={disabled} />
              </div>
              {/* gender */}
              <div className="mb-3 col-6">
                <label htmlFor="gender" className="form-label">Gender</label>
                <select className="form-select" id='gender' aria-label="Default select example"
                  defaultValue={user.gender} minLength={3}
                  onChange={(e) => { setUser({ ...user, [e.target.id]: e.target.value }) }} required disabled={disabled}>
                  <option value="1">Man</option>
                  <option value="2">Woman</option>
                </select>
              </div>
              {/* birthday */}
              <div className="mb-3 col-6">
                <label htmlFor="birthday" className="form-label">Birthday</label>
                <input type="date" id="birthday" className="form-control"
                  defaultValue={user.birthday}
                  format='yyyy-mm-dd'
                  onChange={(e) => { setUser({ ...user, [e.target.id]: e.target.value }); console.log(e.target.value); }}
                  required disabled={disabled}

                />

              </div>

              <div className="mb-3 col-6">
                <label htmlFor="phone" className="form-label">Phone number</label>
                <input type="text" id="phone" className="form-control" placeholder='991234567'
                  defaultValue={user.phone}
                  onChange={(e) => { setUser({ ...user, [e.target.id]: e.target.value }); setError('') }}
                  disabled maxLength={'9'} minLength={9}
                />
                <div id="emailHelp" className="form-text text-danger">{error?.response?.data?.phone[0]}</div>
              </div>
              {/* Region */}
              <div className="mb-3 col-6">
                <label htmlFor="region" className="form-label">Region</label>
                <input type='text' className="form-control" id="region" placeholder='Toshkent shahri'
                  defaultValue={user.region}
                  onChange={(e) => { setUser({ ...user, [e.target.id]: e.target.value }) }} required disabled={disabled} />
              </div>
              {/* City */}
              <div className="mb-3 col-6">
                <label htmlFor="city" className="form-label">City</label>
                <input type='text' className="form-control" id="city" placeholder='City'
                  defaultValue={user.city}
                  onChange={(e) => { setUser({ ...user, [e.target.id]: e.target.value }) }} required disabled={disabled} />
              </div>
              {/* Address */}
              <div className="mb-3 col-6">
                <label htmlFor="address" className="form-label">Address</label>
                <input type='text' className="form-control" id="address" placeholder='Address'
                  defaultValue={user.address}
                  onChange={(e) => { setUser({ ...user, [e.target.id]: e.target.value }) }} required disabled={disabled} />
              </div>
              {
                disabled ? '' :
                  <button type="submit" className="btn btn-primary" onClick={(e) => { profile_update(e); }}>Save Profile</button>
              }
            </form> :
            <p>Loading...</p>}
        </div>
      </div>
    </Profile_style>
  )
}
