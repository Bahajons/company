import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react';
import { AddQuestionStyle } from '../../styleComponent/Questions'
import { delete_question, get_question_detail, patch_question } from '../utils/api_fetch'
import Swal from 'sweetalert2'
import { useEffect } from 'react';
import { Divider } from '@mui/material';

const jsDemoImagesTransform = document.createElement('script');
jsDemoImagesTransform.type = 'text/javascript';
jsDemoImagesTransform.src = 'https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image';
document.head.appendChild(jsDemoImagesTransform);
// This needs to be included before the '@wiris/mathtype-tinymce6' is loaded synchronously
//  window.$ = $;
window.tinymce = require('tinymce');  // Expose the TinyMCE to the window.
// Load wiris plugin synchronously.
require('@wiris/mathtype-tinymce6');

export default function EditQuestion() {




	const navigate = useNavigate()
	const { slug } = useParams()
	const { id } = useParams()
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
		}
	)


	async function question_get_detail() {
		try {
			const result = await get_question_detail(slug, id)
			console.log(result);
			setQuestion({ ...question, ...result.data })
		} catch (error) {
			console.log(error);
		}
	}
	async function question_update() {
		try {
			const result = await patch_question(slug, id, question)
			console.log(result);
			Swal.fire(
				'Success',
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


	function example_image_upload_handler(blobInfo, success, failure, progress) {
		var xhr, formData;
		xhr = new XMLHttpRequest();
		xhr.withCredentials = false;
		// xhr.open('POST', API_URL + '/api/v1/upload/file');
		// xhr.setRequestHeader('Authorization', 'Bearer ' + getToken());
		xhr.upload.onprogress = (e) => { progress(e.loaded / e.total * 100); };
		xhr.onload = () => {
			var json;
			if (xhr.status === 403) {
				failure('HTTP Error: ' + xhr.status, { remove: true });
				return;
			}
			if (xhr.status < 200 || xhr.status >= 300) {
				failure('HTTP Error: ' + xhr.status);
				return;
			}
			json = JSON.parse(xhr.responseText);
			if (!json || typeof json.data != 'string') {
				failure('Invalid JSON: ' + xhr.responseText);
				return;
			}
			// success(FILE_URL + json.data);
		};
		xhr.onerror = () => { failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status); };
		formData = new FormData();
		formData.append('file', blobInfo.blob(), blobInfo.filename());
		xhr.send(formData);
	};

	const submitData = (e) => {
		e.preventDefault()
		let t = true, err = {}
		if (!(question.name.length > 2)) { t = false; err = { ...err, name: true } }
		if (t) {
			question_update()
			console.log('sddsf');
		}
		setError({ ...error, ...err })
	}


	const init = {
		height: 300,
		menubar: false,
		// Add wiris plugin
		external_plugins: {
			'tiny_mce_wiris': `${window.location.href}/node_modules/@wiris/mathtype-tinymce6/plugin.min.js`
		},
		toolbar: [
			{
				name: 'history', items: ['undo', 'redo']
			},
			{
				name: 'fontselect', items: ['fontselect',]
			},
			{
				name: 'fontsizeselect', items: ['fontsizeselect',],
				className: 'asdfdsagf'
			},
			// {
			// name: 'formatselect', items: [   'formatselect' ]
			// },
			{
				name: 'formatting', items: ['bold', 'italic', 'underline', 'strikethrough']
			},
			{
				name: 'indentation', items: ['outdent', 'indent']
			},
			{
				name: 'alignment', items: ['alignleft', 'aligncenter', 'alignright', 'alignjustify']
			},
			{
				name: 'list', items: ['numlist', 'bullist', 'checklist']
			},
			{
				name: 'table', items: ['table']
			},
			{
				name: 'colors', items: ['forecolor', 'backcolor', 'casechange', 'permanentpen', 'formatpainter', 'removeformat']
			},
			{
				name: 'math', items: ['subscript', 'superscript']
			},
			{
				name: 'viris-math', items: ['tiny_mce_wiris_formulaEditor'],
			},
			{
				name: 'viris-chem', items: ['tiny_mce_wiris_formulaEditorChemistry'],
			},
			{
				name: 'chars', items: ['charmap']
			},
			{
				name: 'file', items: ['image', 'link',  /*'codesample'*/]
			},
			{
				name: 'full', items: ['fullscreen',  /*'preview'*/ 'code']
			},
		],
		htmlAllowedTags: ['.*'],
		htmlAllowedAttrs: ['.*'],
		extended_valid_elements: '*[.*]',
	}


	

	useEffect(() => {
		question_get_detail()
	}, [])

	return (
		<AddQuestionStyle>
			<div className="container">
				{console.log(slug, 'dsadsad=>', id)}
				{question?.name ?
					<>
						<h5 className='text-center pt-4' >Edit question</h5>
						<form className='row pt-3' onSubmit={submitData}>
							<div className="mb-3 col-8">
								<label htmlFor="name" className="form-label">Question</label>
								<textarea type="text" id="name" className="form-control" placeholder='Question'
									value={question?.name}
									onChange={(e) => {
										setQuestion({ ...question, [e.target.id]: e.target.value });
									}} />
								{error?.name ? <span style={{ fontSize: '14px', color: 'red' }}>Name should be at last 3 characters</span> : ''}
							</div>
							<div className="mb-3 col-4">
								<label htmlFor="ball" className="form-label">Ball</label>
								<input type="text" id="ball" className="form-control" placeholder='0'
									value={question?.ball}
									onChange={(e) => {
										setQuestion({ ...question, [e.target.id]: e.target.value });
									}} />
								{error?.ball ? <span style={{ fontSize: '14px', color: 'red' }}>Ball should be at last one character</span> : ''}
							</div>
							<div className="mb-3 " jsx="true">
								<label className='mb-1' htmlFor="full_description">Note</label>
								{question?.name ?
									<Editor
										jsx={true} init={init}
										apiKey={'c5d5f21e638402a6719a675c085491829c54c6c13bd18b8f17927c84e7368158'}
										id='description'
										placeholder=''
										initialValue={question?.description} onChange={(e) => {
											setQuestion({ ...question, [e.target.id]: e.target.getContent() });
											console.log(e.target);
										}}
									/> : ''
								}
							</div>
							<div className="d-flex justify-content-between">
								<button type="submit" className="btn btn-primary btn-sm mb-3">Update question</button>
								<button type="button" className="btn btn-danger btn-sm mb-3" onClick={() => { question_delete() }}>Delete question</button>
							</div>
						</form>
						{console.log(question)}
					</>
					: 'Loading...'}
			</div>
		</AddQuestionStyle>
	)
}
