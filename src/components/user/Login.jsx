import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../utils/api_fetch';
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';
import Loader from '../utils/Loader';
export default function Login() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState({
    phone: false,
    password: false,
  })
  const [loader, setLoader] = useState(false)
  const [user, setUser] = useState({
    phone: '',
    password: ''
  })
  const [check, setCheck] = useState(false)
  let err = {}


  async function login_user(e) {
    setLoader(true)
    if (user.phone.length > 7 && user.password) {
      try {
        const result = await login(user)
        console.log(result);
        localStorage.setItem('token', result?.data?.access)
        Swal.fire(
          'Success',
          'You Loged in successfully',
          'success'
        )
        navigate('/')
        dispatch({ type: 'USER', payload: result?.data?.user })
        setLoader(false)
      } catch (error) {
        setLoader(false)
        setError(error)
        console.log(error);
      }
    }
  }
  const submitData = (e) => {
    setLoader(true)
    e.preventDefault()
    let t = true, err = {}
    // if (!(user.phone.length == 9)) { t = false; err = { ...err, phone: true } }
    if (!(user.password.length > 7)) { t = false; err = { ...err, password: true } }
    if (t) {
      login_user()
    }

    setError({ ...error, ...err })
    setLoader(false)
  }

  return (
    <div>
      {loader ? <Loader /> : ''}
      <div className="container">
        <div>
          <h5 className='text-center pt-4'>Login</h5>
          <form className='col-md-6 offset-md-3' onSubmit={submitData}>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone number</label>
              <input type="text" id="phone" className="form-control" placeholder='991234567'
                defaultValue={user.phone}
                onChange={(e) => { setUser({ ...user, [e.target.id]: e.target.value }); setError('') }}
              />
              {error?.phone ? <span style={{ fontSize: '14px', color: 'red' }}>Number should be 9 characters</span> : ''}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type={check ? 'text' : 'password'} className="form-control" id="password" placeholder='********'
                defaultValue={user.password}
                onChange={(e) => { setUser({ ...user, [e.target.id]: e.target.value }) }} />
              {error?.password ? <span style={{ fontSize: '14px', color: 'red' }}>Number should be 8 characters</span> : ''}
              <div id="emailHelp" className="form-text text-danger">{error?.response?.data?.detail}</div>
              <div className="form-check">
                <input className="form-check-input" onChange={() => setCheck(!check)} type="checkbox" id="flexCheckChecked" />
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  show password
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
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
