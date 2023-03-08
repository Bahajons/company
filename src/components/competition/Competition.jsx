import React, { useEffect, useState } from 'react'
import { get_competition } from '../utils/api_fetch'
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import AlarmIcon from '@mui/icons-material/Alarm';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { Divider } from '@mui/material';
import { CompetitionStyled } from '../../styleComponent/Competition';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Loader from '../utils/Loader'
export default function Competition() {

  const [competition, setCompetition] = useState()
  const navigate = useNavigate()


  async function competition_get() {

    try {

      const result = await get_competition()
      console.log(result);
      setCompetition(result.data.results)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    competition_get()
  }, [])




  return (
    <CompetitionStyled>
      {console.log(competition)}
      <div className="container">
        <div className="div">
          <h5 className='text-center pt-4'>List of your competitions</h5>
          <div className='d-flex justify-content-end'>
            <button className='btn btn-primary btn-sm' onClick={() => navigate('/competition/add')}>Add competition</button>
          </div>
          {competition ?
            <ul className='p-0 m-0'>
              {competition?.map((item, index) => {
                return (
                  <div key={index}>
                    <div>
                      <Link className='nav-link' to={`/competition/${item.slug}`}>
                        <div className="competition">
                          <h5 className='text-primary'>{item.name}</h5>
                          <div className='d-flex'>
                            <p className='mb-1'><b>Start: </b>{item.start_date.replace('T', ' ').slice(0, -3)}</p>
                            <p className='mb-1' style={{ paddingLeft: '8px' }}><b>End: </b>{item.end_date.replace('T', ' ').slice(0, -3)}</p>
                          </div>
                          <div className="d-flex">
                            <p className='mb-1'><b>Price: </b>{item.price} so'm</p>
                            <p className='mb-1' style={{ paddingLeft: '8px' }}><b>Duration: </b>{item.duration} minut</p>
                          </div>
                        </div>
                      </Link>
                      <div dangerouslySetInnerHTML={{ __html: item.full_description }} />
                      <div>
                        <Link className='nav-link pb-3 text-primary' to={`/questions/${item.slug}`}>Savollarga o'tish</Link>
                      </div>
                      <Divider className='mb-3' />
                    </div>
                  </div>
                )
              })
              }
            </ul> : <p>Loading...</p>
          }
        </div>
      </div>
    </CompetitionStyled>
  )
}
