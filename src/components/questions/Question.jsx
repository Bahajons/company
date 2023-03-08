import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { QuestionStyle } from '../../styleComponent/Questions';
import { get_question_all } from '../utils/api_fetch';
import MathShow from '../utils/MathShow';

export default function Question() {

  const navigate = useNavigate()
  const { slug } = useParams()
  const [questions, setQuestions] = useState([])
  const alph = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X']


  async function get_all_question() {
    try {
      const result = await get_question_all(slug)
      console.log(result.data.results);
      setQuestions(result.data.results)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    get_all_question()
  }, [])

  return (
    <QuestionStyle>
      <div className="container">
        <div className="div">
          <h5 className='text-center pt-4'>List of questions</h5>
          <div className='d-flex justify-content-end'>
            <button className='btn btn-primary btn-sm' onClick={() => navigate(`/question/add/${slug}`)}>Add question</button>
          </div>
          {console.log(questions)}
          <div className='pb-3'>
            {questions.map((item, index) => {
              return (
                <div className='question' key={index}>
                  <><h6>{index + 1}. </h6>
                    {item?.name ?
                      <>
                        <div className='note'>{<MathShow text={item?.name} />}</div>
                      </>
                      : ''
                    }</>
                  <>
                    {/* <i>Ball: </i><i>{item?.ball} </i><br /> */}
                    {item?.description ?
                      <>
                        <i> {'Note:'} </i><div className='note'>{<MathShow text={item?.name} />}</div>
                      </>
                      : ''
                    }
                    <hr className='mt-1 mb-4' />
                    {item?.answer ? item.answer?.map((item, index) => {
                      return (
                        <div className="d-flex" key={index} >
                          <h5 className='mr-3' style={{ color: item.ball == 0 ? '#ff0000' : '#59FF00' }}>{alph[index]}{')'}</h5>
                          <div key={index} className='w-100 px-2'>
                            <MathShow text={item?.name} />
                            <hr className='mt-1 mb-3' style={{ color: '#a1a1a1' }} />
                          </div>
                        </div>)
                    }) : ''}
                  </>
                  <div className="d-flex justify-content-end">
                    <Link className='nav-link text-primary' to={`/question/edit/${slug}/${item?.id}`}>Edit</Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </QuestionStyle>
  )
}
