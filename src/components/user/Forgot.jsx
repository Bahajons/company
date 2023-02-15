import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { forgot, verify } from '../utils/api_fetch'

export default function Forgot() {


  const navigate = useNavigate()
  const [error, setError] = useState()
  const [result, setResult] = useState()
  const [user, setUser] = useState({
    phone: '',
    code: ''
  })


  async function forgot_password(e) {

    if (!result) {

      if (user.phone.length > 7) {
        e.preventDefault()
        try {
          const result = await forgot(user)
          console.log(result);
          setResult(result)

        } catch (error) {
          setError(error)
          console.log(error);
        }
      }
    }
    else {
      if (user.phone.length > 7) {
        e.preventDefault()
        try {
          const result = await verify(user);
          console.log(result);
          localStorage.setItem('token', result?.data?.access)
          navigate('/setpassword')
        } catch (error) {

        }
      }
    }
  }


  return (
    <div>
      <div className="container">
        <div>
          <h5 className='text-center mt-4'>Reset password</h5>
          <form className='col-md-6 offset-md-3'>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone number</label>
              <input type="text" id="phone" className="form-control" placeholder='991234567'
                defaultValue={user.phone}
                onChange={(e) => { setUser({ ...user, [e.target.id]: e.target.value }); setError('') }}
                required maxLength={'9'} minLength={9} />
              <div id="emailHelp" className="form-text text-danger">{error?.response?.data?.detail}</div>
            </div>
            {result?.data?.access ?
              <div className="mb-3">
                <label htmlFor="code" className="form-label">Code (we sent to your number)</label>
                <input type="text" id="code" className="form-control" placeholder='12345'
                  onChange={(e) => { setUser({ ...user, [e.target.id]: e.target.value }); setError('') }}
                  required maxLength={5} minLength={5}
                />
                <div id="emailHelp" className="form-text text-danger">{error?.response?.data?.phone[0]}</div>
              </div> :
              ''}
            <button type="button" className="btn btn-primary w-100" onClick={(e) => { forgot_password(e) }}>Reset password</button>
            <div className="d-flex justify-content-between">
              <div className='mt-3'>
                <Link className='nav-link' to={'/login'}>Login</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
