import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api_fetch'

export default function Register() {

  const navigate = useNavigate()

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    password: ''
  })
  const [error, setError] = useState()
  const [check, setCheck] = useState(false)

  async function register_user(e) {
    if (user.first_name && user.last_name && user.phone && user.password.length > 7) {
      e.preventDefault()
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
  }




  return (
    <div>
      <div className="container">
        <div>
          <h5 className='text-center mt-4'>Register</h5>
          <form className='row'>
            <div className="mb-3 col-6">
              <label htmlFor="first_name" className="form-label">Name</label>
              <input type="text" className="form-control" id="first_name" aria-describedby="emailHelp" placeholder='Azizbek'
                minLength={3}
                defaultValue={user.first_name}
                onChange={(e) => { setUser({ ...user, [e.target.id]: e.target.value }) }}
                required />
              {console.log(user)}

            </div>
            <div className="mb-3 col-6">
              <label htmlFor="last_name" className="form-label">Surname</label>
              <input type="text" className="form-control" id="last_name" placeholder='Botirov'
                defaultValue={user.last_name} minLength={3}
                onChange={(e) => { setUser({ ...user, [e.target.id]: e.target.value }) }} required />
            </div>
            <div className="mb-3 col-6">
              <label htmlFor="phone" className="form-label">Phone number</label>
              <input type="text" id="phone" className="form-control" placeholder='991234567'
                defaultValue={user.phone}
                onChange={(e) => { setUser({ ...user, [e.target.id]: e.target.value }); setError('') }}
                required maxLength={'9'} minLength={9}
              />
              <div id="emailHelp" className="form-text text-danger">{error?.response?.data?.phone[0]}</div>
            </div>

            <div className="mb-3 col-6">
              <label htmlFor="password" className="form-label">Password</label>
              <input type={check ? 'text' : 'password'} className="form-control" id="password" placeholder='********'
                defaultValue={user.password} minLength={8}
                onChange={(e) => { setUser({ ...user, [e.target.id]: e.target.value }) }} required />

              <div className="form-check">
                <input className="form-check-input" onChange={() => setCheck(!check)} type="checkbox" id="flexCheckChecked" />
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  show password
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" onClick={(e) => { register_user(e); }}>Register</button>
          </form>
          <div className='mt-3'>
            <Link className='nav-link' to={'/login'}>I already have account! Login</Link>
          </div>
        </div>
      </div>

    </div>
  )
}
