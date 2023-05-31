import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import FastForwardIcon from '@mui/icons-material/FastForward';
import { get_competition, get_promocode } from '../utils/api_fetch'
import AddPromocode from './AddPromocode'

export default function Promocode() {
  const [competition, setCompetition] = useState([])

  async function competition_get() {
    try {
      const result = await get_competition()
      setCompetition(result.data.results)
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  function handleCopyClick(code) {
    navigator.clipboard.writeText(code)
      .then(() => {
        console.log('copied');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  }


  useEffect(() => {
    competition_get()
  }, [])



  function my_code(item, index) {
    if (item.price > 0) {
      return (
        <div key={index}>
          <><i>Name: </i>{item.name}</>
          <div>
            <div>
              <><i>Price: </i><b>{item.price} so'm</b></><br />
            </div>
          </div>
          <div className='d-flex justify-content-end'>
            <Link className='nav-link text-primary' to={`/competition/promocode/${item.price}/${item.slug}`} >Promocode <FastForwardIcon /></Link>
          </div>
          {/* <hr/> */}
        </div>
      )
    }
  }


  return (
    <div>
      <div className="container">
        <h5 className='text-center pt-4'>Promo codes</h5>
        <hr />
        {competition?.map((item, index) =>
          my_code(item, index)
        )}
      </div>
    </div>
  )
}
