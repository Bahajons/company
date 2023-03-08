import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react';
import { AddQuestionStyle } from '../../styleComponent/Questions'
import { add_answer, add_question, get_answer_detail, get_question_detail } from '../utils/api_fetch'
import Swal from 'sweetalert2'
import MathEditor from '../utils/MathEditor';
import AddAnswer from '../answers/AddAnswer';
import Answer from '../answers/Answer';
import { useEffect } from 'react';
import MathShow from '../utils/MathShow';
import { useDispatch, useSelector } from 'react-redux';


export default function AddQuestion() {

  const navigate = useNavigate()
  const { slug, id } = useParams()
  const [question_id, setQuestion_id] = useState()
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const [question, setQuestion] = useState({
    name: '',
    type: '1',
    description: '',
    ball: ''
  })
  const [error, setError] = useState(
    {
      name: false,
      ball: false,
    })


  async function question_add() {
    try {
      const result = await add_question(slug, question)
      console.log(result);
      setQuestion_id(result.data)
      Swal.fire(
        'Success',
        'Question has added',
        'success'
      )

      navigate(`/question/add/${slug}/${result.data.id}`)
    } catch (error) {
      console.log(error);
    }
  }

  async function answer_add() {
    try {
      const result = await add_answer(slug, question)
      console.log(result);
      // Swal.fire(
      //   'Success',
      //   'Question has added',
      //   'success'
      // )
      navigate(-1)
    } catch (error) {
      console.log(error);
    }
  }


  const submitData = (e) => {
    e.preventDefault()
    let t = true, err = {}
    if (!(question.name.length > 2)) { t = false; err = { ...err, name: true } }
    if (t) {
      question_add()
    }
    setError({ ...error, ...err })
  }

  async function answer_get() {
    try {
      const result = await get_question_detail(slug, id)
      setQuestion_id(result.data)
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {

    if (id) {
      answer_get()
    }

  }, [])




  return (
    <AddQuestionStyle>
      <div className="container">
        {console.log(selector.add_answer)}
        <h5 className='text-center py-4' >Add question</h5>
        <div className='d-flex justify-content-end'>
            <button className='btn btn-primary btn-sm' onClick={() => navigate(-2)}>Back to questions</button>
          </div>
        {id ?
          <>
            <MathShow text={question_id?.name}/>
            <hr />
          </>
          :
          <form className='pt-3' onSubmit={submitData}>
            <div className="mb-3 col-12" jsx="true">
              <label className='mb-2' htmlFor="name">Question</label>
              <MathEditor value={question.name} setValue={v => setQuestion({ ...question, name: v })} />
              {error?.name ? <span style={{ fontSize: '14px', color: 'red' }}>Question should be at last 3 characters</span> : ''}
              {console.log(question)}
            </div>
            <div className="d-flex justify-content-between">
              <div className="mb-3">
                <label htmlFor="type" className="form-label">Type of question</label>
                <select className="form-select form-select-sm" id='type' defaultValue={question?.type}>
                  <option value={'1'}>One answer</option>
                </select>
                {error?.name ? <span style={{ fontSize: '14px', color: 'red' }}>Name should be at last 3 characters</span> : ''}
              </div>
              <div className="mb-3 " style={{ paddingTop: '32px' }}>
                <button type="submit" className="btn btn-primary btn-sm">Add question</button>
              </div>
            </div>
          </form>
        }
        <Answer edu_slug={slug} id={question_id?.id} />
        {id ?
          <div>
            <AddAnswer edu_slug={slug} id={id} />
          </div>
          : ''
        }
        {console.log(question)}
      </div>
    </AddQuestionStyle>
  )
}
