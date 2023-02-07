import React, { useEffect, useState } from 'react'
import { get_competition } from '../api_fetch'
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import AlarmIcon from '@mui/icons-material/Alarm';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { Divider } from '@mui/material';
import { CompetitionStyled } from '../competetion-styled/CompetitionStyled';
import { Link } from 'react-router-dom';

export default function Competition() {

  const [competition, setCompetition] = useState()



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
          <h5 className='text-center mt-4'>List of your competitions</h5>
          {competition ?
            <ul className='p-0 m-0'>
              {competition?.map((item, index) => {
                return (
                  <Link key={index} className='nav-link' to={`/competition/${item.slug}`}>
                    <li>
                      <div className="competition">
                        <h6>{item.name}</h6>
                        <p><b>Start: </b>{item.start_date.replace('T', ' ').slice(0, -3)}</p>
                        <p><b>End: </b>{item.end_date.replace('T', ' ').slice(0, -3)}</p>
                        <p><b>Price: </b>{item.price} so'm</p>
                        <p><b>Duration: </b>{item.duration} minut</p>
                      </div>
                      <p><div dangerouslySetInnerHTML={{ __html: item.full_description }} /></p>
                      <Divider className='mb-3' />
                    </li>
                  </Link>
                )
              })
              }
            </ul> : <p>Loading...</p>}

        </div>
      </div>
    </CompetitionStyled>
  )
}
