import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { verify } from '../api_fetch'
import Swal from 'sweetalert2'

export default function Verify() {

  const navigate = useNavigate()
  const [error, setError] = useState()
  const [user, setUser] = useState({
    phone: localStorage.getItem('phone'),
    code: ''
  })


  async function verify_user(e) {

    if (user.code.length == 5) {
      e.preventDefault()

      try {
        const result = await verify(user)
        console.log(result);
        navigate('/login')
        localStorage.removeItem('phone')
        Swal.fire(
          'Success',
          'Your profile verified successfully',
          'success'
        )
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
          <h5 className='text-center mt-4'>Verify</h5>
          <form className='d-flex  align-items-start'>
            <div className="mb-3 col-8 offset-md-3 offset-0 col-md-4">
              <label htmlFor="code" className="form-label">Verify number</label>
              <input type="text" id="code" className="form-control" placeholder='12345'
                defaultValue={verify_user.code}
                onChange={(e) => { setUser({ ...user, [e.target.id]: e.target.value }); setError('') }}
                required maxLength={5} minLength={5}
              />
              <div id="emailHelp" className="form-text text-danger">{error?.response?.data.code}</div>
            </div>
            <div className="col-3 offset-1 col-md-2" style={{ marginTop: '33px' }}>
              <button type="submit" className="btn btn-primary" onClick={(e) => { verify_user(e); }}>Verify</button>
            </div>
          </form>
          <div className='mt-3 offset-md-3 offset-0'>
            <Link className='nav-link' to={'/register'}>{`Back to register`}</Link>
          </div>
        </div>
      </div>

    </div>
  )
}
