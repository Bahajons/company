import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EditQuestionStyle } from '../../styleComponent/Questions'
import { delete_answer, delete_question, get_question_detail, patch_question, update_answer } from '../utils/api_fetch'
import Swal from 'sweetalert2'
import { useEffect } from 'react';
import MathEditor from '../utils/MathEditor';
import MathShow from '../utils/MathShow'
import AddAnswer from '../answers/AddAnswer'
import { useSelector } from 'react-redux'


export default function EditQuestion() {

  const alph = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X']
  const [edit, setEdit] = useState({
    question: false,
    answer0: false,
    answer1: false,
    answer2: false,
    answer3: false,
    answer4: false,
    answer5: false,
  })
  const navigate = useNavigate()
  const { slug, id } = useParams()
  const selector = useSelector(state => state)
  const [question, setQuestion] = useState({
    name: '',
    type: '1',
    description: '',
    ball: ''
  })

  const [add_answer, setAdd_answer] = useState({
    name: '',
    type: '1',
    description: '',
    ball: ''
  })

  const [answer, setAnswer] = useState([])
  const [error, setError] = useState(
    {
      name: false,
      ball: false,
    }
  )
  const [edit_answer, setEdit_answer] = useState({
    ball: '',
    id: '',
    name: ''
  })


  async function question_get_detail() {
    try {
      const result = await get_question_detail(slug, id)
      console.log(result);
      setQuestion({ ...question, ...result.data })
      setAnswer(result.data.answer)
    } catch (error) {
      console.log(error);
    }
  }
  async function question_update() {
    try {
      const result = await patch_question(slug, id, question)
      console.log(result);
      Swal.fire(
        'Question has updated',
        'success'
      )
      navigate(-1)
    } catch (error) {
      console.log(error);
    }
  }

  async function question_delete() {
    try {
      const result = await delete_question(slug, id)
      console.log(result);
      Swal.fire(
        'Success',
        'Question has deleted',
        'success'
      )
      navigate(-1)
    } catch (error) {
      console.log(error);
    }
  }


  async function answer_update(id_answer) {
    try {
      const result = await update_answer(slug, id, id_answer, edit_answer)
      console.log(result);
      Swal.fire(
        'Success',
        'Answer has updated',
        'success'
      )
      // navigate(-1)
      setEdit_answer({
        ball: '',
        id: '',
        name: ''
      })
      question_get_detail()

    } catch (error) {
      console.log(error);
    }
  }

  async function answer_delete(id_answer) {
    try {
      const result = await delete_answer(slug, id, id_answer)
      console.log(result);
      Swal.fire(
        'Answer has deleted',
      )
      setEdit_answer({
        ball: '',
        id: '',
        name: ''
      })
      question_get_detail()
      // navigate(-1)
    } catch (error) {
      console.log(error);
    }
  }


  const submitData = (e) => {
    e.preventDefault()
    let t = true, err = {}
    if (!(question.name.length > 2)) { t = false; err = { ...err, name: true } }
    if (t) {
      question_update()
    }
    setError({ ...error, ...err })
  }


  const submitAnswer = (e) => {
    e.preventDefault()
    let t = true, err = {}
    if (!(add_answer.name.length > 2)) { t = false; err = { ...err, name: true } }
    if (t) {
      question_update()
    }
    setError({ ...error, ...err })
  }

  async function answer_post() {
    try {
      const result = await add_answer(slug, id, add_answer)
      console.log(result);
      setAnswer({
        ball: '',
        id: '',
        name: ''
      })
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    question_get_detail()
  }, [selector.add_answer])





  return (
    <EditQuestionStyle>

      {console.log(slug, 'dsadsad=>', id, selector)}

      {question?.name ?
        <div className="container">
          <h5 className='text-center py-4' >Edit question</h5>
          {edit.question ?
            <>
              <form className='row pt-3' onSubmit={submitData}>
                <div className="mb-3 " jsx="true">
                  <label className='mb-1' htmlFor="full_description">Question</label>
                  <MathEditor value={question?.name}
                    setValue={v => setQuestion({ ...question, name: v })}
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-primary btn-sm mb-3">Update question</button>
                  <button type="button" className="btn btn-danger btn-sm mb-3" onClick={() => { question_delete() }}>Delete question</button>
                </div>
              </form>
              {console.log(question)}
            </> :
            <>
              <MathShow text={question?.name} />
              <div className="d-flex justify-content-end">
                <a className='nav-link text-primary' style={{ cursor: 'pointer' }} onClick={() => setEdit({ ...edit, question: true })}>Edit</a>
              </div>
            </>
          }
          <hr className='mt-1 mb-3' style={{ color: '#000000' }} />
          {/* =======//////======  Question ========////======= */}
          {answer.length > 0 ? answer?.map((item, index) => {
            return (<div key={index}>
              <div className="d-flex align-items-center" key={index} >
                <h5 className='mr-3' style={{ color: item.ball == 0 ? '#ff0000' : '#59FF00' }}>{alph[index]}{')'}</h5>
                {item.id == edit_answer?.id ?
                  <div key={index} className='w-100 px-2'>
                    <MathEditor value={edit_answer?.name}
                      setValue={v => setEdit_answer({ ...edit_answer, name: v })} />
                    <div className="d-flex align-items-center mt-2">
                      <input className='form-control w-50 input-sm' value={edit_answer?.ball}
                        onChange={(e) => setEdit_answer({ ...edit_answer, ball: e.target.value })} />
                      <button type="submit" className="btn btn-primary btn-sm mx-2" onClick={() => answer_update(item.id)}>Update answer</button>
                      <button type="button" className="btn btn-danger btn-sm" onClick={() => answer_delete(item.id)}>Delete answer</button>
                    </div>
                  </div> :
                  <div key={index} className='w-100 px-2'>
                    <MathShow text={item?.name} />
                    <i>Ball: {item.ball}</i>
                  </div>}
                {edit_answer?.id ?
                  item.id == edit_answer.id ? '' :
                    '' : <h6 style={{ cursor: 'pointer' }}
                      onClick={() => setEdit_answer({ ...edit_answer, id: item.id, name: item.name, ball: item.ball })}>Edit</h6>
                }
              </div>
              <hr className='mt-1 mb-3' style={{ color: '#a1a1a1' }} />
            </div>)
          }) : ''}

          {/*  ========== Add question ========= */}
          <AddAnswer />
        </div> : ''
      }

    </EditQuestionStyle>
  )
}
