import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api_fetch';
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';
export default function Login() {

  const navigate = useNavigate()
  const [error, setError] = useState()
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    phone: '',
    password: ''

  })
  const [check, setCheck] = useState(false)

  async function login_user(e) {

    if (user.phone.length > 7 && user.password) {
      e.preventDefault()
      try {
        const result = await login(user)
        console.log(result);
        localStorage.setItem('token', result?.data?.access)
        Swal.fire(
          'Success',
          'You entered successfully',
          'success'
        )
        navigate('/')
        dispatch({ type: 'USER', payload: result?.data?.user })
      } catch (error) {
        setError(error)
        console.log(error);
      }
    }
  }


  return (
    <div>
      <div className="container">
        <div>
          <h5 className='text-center mt-4'>Login</h5>
          <form className='col-md-6 offset-md-3'>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone number</label>
              <input type="text" id="phone" className="form-control" placeholder='991234567'
                defaultValue={user.phone}
                onChange={(e) => { setUser({ ...user, [e.target.id]: e.target.value }); setError('') }}
                required maxLength={'9'} minLength={9} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type={check ? 'text' : 'password'} className="form-control" id="password" placeholder='********'
                defaultValue={user.password}
                onChange={(e) => { setUser({ ...user, [e.target.id]: e.target.value }) }} required />
              <div id="emailHelp" className="form-text text-danger">{error?.response?.data?.detail}</div>
              <div className="form-check">
                <input className="form-check-input" onChange={() => setCheck(!check)} type="checkbox" id="flexCheckChecked" />
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  show password
                </label>
              </div>
            </div>
            <button type="button" className="btn btn-primary w-100" onClick={(e) => { login_user(e) }}>Login</button>
            <div className="d-flex justify-content-between">
              <div className='mt-3'>
                <Link className='nav-link' to={'/register'}>Register</Link>
              </div>
              <div className='mt-3'>
                <Link className='nav-link' to={'/forgot'}>Forgot password</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
