import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { QuestionStyle } from '../../styleComponent/Questions';
import { get_question_all } from '../utils/api_fetch';

export default function Question() {

  const navigate = useNavigate()
  const { slug } = useParams()
  const [questions, setQuestions] = useState([])


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
            <button className='btn btn-primary btn-sm' onClick={() => navigate(`/questions/add/${slug}`)}>Add competition</button>
          </div>
          {console.log(questions)}
          <div>
            {questions.map((item, index) => {
              return (
                <div className='question' key={index}>
                  <h6><span>{index + 1}. </span> {item?.name}</h6>
                  <>
                    <i>Ball: </i><i>{item?.ball} </i>
                    {item?.description ?
                      <>
                        <i> {'Description:'} </i><i>{item.description}</i>
                      </>
                      : ''
                    }
                  </>
                </div>
              )
            })}

          </div>
        </div>
      </div>
    </QuestionStyle>
  )
}
