import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { post_promocode } from '../utils/api_fetch'

export default function AddPromocode(props) {
  const { slug } = useParams()
  const [promocode, setPromocode] = useState({
    name: '',
    percent: ''
  })
  const [error, setError] = useState({
    name: false,
    percent: false
  })

  async function promocode_add() {
    try {
      const result = await post_promocode(slug, promocode)
      console.log(result);
      setPromocode({
        name: '',
        percent: ''
      })
      if (props) {
        props.get()
      }
    } catch (error) {
      console.log(error);
    }
  }

  function onSubmit(e) {
    e.preventDefault()
    let t = true, err = {
      name: false,
      percent: false
    };
    if (promocode.name.length < 5) { t = false; err = { ...err, name: true } }
    if (!(promocode.percent)) { t = false; err = { ...err, percent: true } }
    if (t) {
      promocode_add()
    }
    setError({ ...error, ...err })
    console.log(promocode.name.length);
  }


  return (
    <div>
      <div className="container">
        <div>
          <form className="d-flex mt-5" onSubmit={onSubmit}>
            <div>
              <label htmlFor="name">Promocode</label>
              <input type="text" className='form-control' id='name' value={promocode.name}
                onChange={e => setPromocode({ ...promocode, [e.target.id]: e.target.value.toUpperCase() })}
                maxLength='5' style={{ textTransform: 'uppercase' }} />
              {console.log(promocode)}
              {error.name ? <span className='text-danger'>It must be at last 5 characters</span> : ''}
            </div>
            <div className='px-3'>
              <label htmlFor="percent">Percent {promocode.percent}%</label>
              <input type="number" className='form-control' id='percent' value={promocode.percent}
                onChange={e => setPromocode({ ...promocode, [e.target.id]: e.target.value })} />
              {error.percent ? <span className='text-danger'>It must be at last a character</span> : ''}
            </div>
            <div>
              <button type='submit' className='btn btn-success mt-4'>Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
