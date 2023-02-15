import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { set_password } from '../utils/api_fetch'

export default function SetPassword() {

  const [check, setCheck] = useState(false)
  const [error, setError] = useState({
    password: false
  })
  const navigate = useNavigate()
  const [user, setUser] = useState({
    password: ''
  })


  async function setPassword(e) {

    if (user.password.length > 7) {
      e.preventDefault()
      try {
        const result = await set_password(user)
        console.log(result);
        Swal.fire(
          'Success',
          'You password changed',
          'success'
        )
        navigate('/login')
      } catch (error) {
        console.log(error);
      }
    }
  }

  const submitData = (e) => {
    e.preventDefault()
    let t = true, err = {}
    if (!(user.password.length > 7)) { t = false; err = { ...err, password: true } }
    if (t) {
      setPassword()
    }
    setError({ ...error, ...err })
  }




  return (
    <div>
      <div className="container">
        <div>
          <h5 className='text-center pt-4'>New Password</h5>
          <form className='col-md-6 offset-md-3' onSubmit={submitData}>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type={check ? 'text' : 'password'} className="form-control" id="password" placeholder='********'
                onChange={(e) => { setUser({ ...user, [e.target.id]: e.target.value }) }} required />
              {error ? <span style={{ fontSize: '14px', color: 'red' }}>Password should be 8 characters</span> : ''}
              <div className="form-check">
                <input className="form-check-input" onChange={() => setCheck(!check)} type="checkbox" id="flexCheckChecked" />
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  show password
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100" onClick={(e) => { setPassword(e) }}>Change password</button>

          </form>
        </div>
      </div>
    </div>
  )
}
