import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { AddQuestionStyle } from '../../styleComponent/Questions'
import { add_question } from '../utils/api_fetch'
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MathType from '@wiris/mathtype-ckeditor5/src/plugin'

// import React, { Component } from 'react';
// import CKEditor from '@ckeditor/ckeditor5-react';
// import MathType from '@wiris/mathtype-ckeditor5/src/plugin';



export default function AddQuestion() {

  const { slug } = useParams()
  const [question, setQuestion] = useState({
    name: 'G\'iyos',
    type: '1',
    description: 'Savollarni to\'liq qismi shu yerga yuborilsa kk',
    ball: '13'
  })


  async function question_add(e) {

    e.preventDefault()
    try {
      // const result = await add_question(slug, question)
      console.log('result');
    } catch (error) {

    }
  }



  return (
    <AddQuestionStyle>
      <div className="container">
        {console.log(slug)}
        <h5 className='text-center pt-4' >Add question</h5>
        <form className='row pt-3'>
          <div className="mb-3 col-6">
            <label htmlFor="name" className="form-label">Question</label>
            <input type="number" id="name" className="form-control" placeholder='Question'
              value={question?.name}
              onChange={(e) => { setQuestion({ ...question, [e.target.id]: e.target.value }) }}
              required />
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="ball" className="form-label">Ball</label>
            <input type="number" id="ball" className="form-control" placeholder='5600'
              value={question?.price}
              onChange={(e) => { setQuestion({ ...question, [e.target.id]: e.target.value }) }}
              required />
          </div>
          <div className="mb-3 ">
            <label htmlFor="full_description">Note</label>

            {/* <CKEditor
              editor={ClassicEditor}

              data="<p>Enter your math equation here...</p>"
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });
              }}
            /> */}





            {/* <CKEditor
              editor={
                ClassicEditor}
              id="full_description"
              config={{
                plugins: ['MathType', "@babel/plugin-transform-react-jsx", {
                  "throwIfNamespace": false
                }],
                toolbar: ['Mathtype']
              }}
              style={{
                stroke: "none",
                strokeWidth: 4,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeMiterlimit: 10,
                fill: "#99CC33",
                fillRule: "nonzero",
                opacity: 1,
              }}

              data={question?.description}
              // {Plugin:[]}
              onReady={editor => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setQuestion({ ...question, description: data })
                console.log({ data });
              }}
              onBlur={(event, editor) => {
                // console.log('Blur.', editor);
              }}
              onFocus={(event, editor) => {
                // console.log('Focus.', editor);
              }}
            /> */}
          </div>
          <button type="submit" className="btn btn-primary btn-sm mb-3" onClick={(e) => { question_add(e) }}>Add question</button>
        </form>

      </div>
    </AddQuestionStyle>
  )
}
