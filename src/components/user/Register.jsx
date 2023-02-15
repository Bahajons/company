import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../utils/api_fetch'
import Loader from '../utils/Loader'

export default function Register() {

  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState({
    first_name: false,
    last_name: false,
    phone: false,
    password: false
  })
  
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    password: ''
  })
  const [check, setCheck] = useState(false)

  async function register_user() {
    try {
      const result = await register(user)
      console.log(result);
      localStorage.setItem('phone', user.phone)
      navigate('/verify')
    } catch (error) {
      setError(error)
      console.log('error');
    }

  }

  const submitData = (e) => {
    setLoader(true)
    e.preventDefault()
    let t = true, err = {}
    if (!user.first_name) { t = false; err = { ...err, first_name: true } }
    if (!user.last_name) { t = false; err = { ...err, last_name: true } }
    if (!(user.phone.length == 9)) { t = false; err = { ...err, phone: true } }
    if (!(user.password.length > 7)) { t = false; err = { ...err, password: true } }
    if (t) {
      register_user()
    }
    setError({ ...error, ...err })
    setLoader(false)
  }



  return (
    <div>
      {loader ? <Loader /> : ''}
      <div className="container">
        <div>
          <h5 className='text-center pt-4'>Register</h5>
          <form className='row' onSubmit={submitData}>
            <div className="mb-3 col-6">
              <label htmlFor="first_name" className="form-label">Name</label>
              <input type="text" className="form-control" id="first_name" aria-describedby="emailHelp" placeholder='Azizbek'
                defaultValue={user.first_name}
                onChange={(e) => { setUser({ ...user, [e.target.id]: e.target.value }) }}
              />
              {error?.first_name ? <span style={{ fontSize: '14px', color: 'red' }}>Name is required</span> : ''}
            </div>
            <div className="mb-3 col-6">
              <label htmlFor="last_name" className="form-label">Surname</label>
              <input type="text" className="form-control" id="last_name" placeholder='Botirov'
                defaultValue={user?.last_name}
                onChange={(e) => { setUser({ ...user, [e.target.id]: e.target.value }) }} />
              {error.last_name ? <span style={{ fontSize: '14px', color: 'red' }}>Surname is required</span> : ''}
            </div>
            <div className="mb-3 col-6">
              <label htmlFor="phone" className="form-label">Phone number</label>
              <input type="text" id="phone" className="form-control" placeholder='991234567'
                defaultValue={user.phone}
                onChange={(e) => { setUser({ ...user, [e.target.id]: e.target.value }); setError('') }} />
              {error?.phone ? <span style={{ fontSize: '14px', color: 'red' }}>Phone number should be 9 characters</span> : ''}
              <div id="emailHelp" className="form-text text-danger">{error?.response?.data?.phone[0]}</div>
            </div>

            <div className="mb-3 col-6">
              <label htmlFor="password" className="form-label">Password</label>
              <input type={check ? 'text' : 'password'} className="form-control" id="password" placeholder='********'
                defaultValue={user.password} minLength={8}
                onChange={(e) => { setUser({ ...user, [e.target.id]: e.target.value }) }} />
              {error.password ? <span style={{ fontSize: '14px', color: 'red' }}>Password should be 8 characters</span> : ''}
              <div className="form-check">
                <input className="form-check-input" onChange={() => setCheck(!check)} type="checkbox" id="flexCheckChecked" />
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  show password
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
          <div className='mt-3'>
            <Link className='nav-link' to={'/login'}>I already have account! Login</Link>
          </div>
        </div>
      </div>

    </div>
  )
}
