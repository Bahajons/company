import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { set_password } from '../api_fetch'

export default function SetPassword() {

  const [check, setCheck] = useState(false)
  const [error, setError] = useState()
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
        navigate('/login')
      } catch (error) {
        console.log(error);
      }
    }
  }





  return (
    <div>
      <div className="container">
        <div>
          <h5 className='text-center mt-4'>New Password</h5>
          <form className='col-md-6 offset-md-3'>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type={check ? 'text' : 'password'} className="form-control" id="password" placeholder='********'
                onChange={(e) => { setUser({ ...user, [e.target.id]: e.target.value }) }} required />
              <div id="emailHelp" className="form-text text-danger">{error?.response?.data?.detail}</div>
              <div className="form-check">
                <input className="form-check-input" onChange={() => setCheck(!check)} type="checkbox" id="flexCheckChecked" />
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  show password
                </label>
              </div>
            </div>
            <button type="button" className="btn btn-primary w-100" onClick={(e) => { setPassword(e) }}>Change password</button>

          </form>
        </div>
      </div>
    </div>
  )
}
