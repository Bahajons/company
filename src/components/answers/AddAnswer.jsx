import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { add_answer, get_answer_detail } from '../utils/api_fetch'
import MathEditor from '../utils/MathEditor'

export default function AddAnswer() {

	const { slug, id } = useParams()
	const dispatch = useDispatch()
	const selector = useSelector(state => state)
	const [answer, setAnswer] = useState({
		id: id,
		name: '',
		ball: ''
	})
	const [error, setError] = useState()

	async function answer_post() {
		try {
			const result = await add_answer(slug, id, answer)
			console.log(result);
			setAnswer({
				id: id,
				name: '',
				ball: ''
			})
			dispatch({ type: 'ADD_ANSWER', payload: result.data.id })
		} catch (error) {
			console.log(error);
		}
	}

	function sumbit(e) {
		e.preventDefault()
		let t = true, err = { name: false, ball: false }
		if (!(answer.name)) { t = false; err = { ...err, name: true } }
		if (!(answer.ball)) { t = false; err = { ...err, ball: true } }
		if (t) {
			answer_post()
			console.log('submit');
		}
		setError({ ...error, ...err })
		// console.log('sumbit');
		console.log(answer);
	}


	useEffect(() => {
		// answer_get()
	}, [])

	return (
		<div>
			{console.log(slug, id)}
			{console.log(selector)}
			<form onSubmit={sumbit}>
				<div className="mb-3 col-12" jsx="true">
					<label className='mb-2' htmlFor="name">Answer</label>
					<MathEditor value={answer.name} setValue={v => setAnswer({ ...answer, name: v })} />
					{error?.name ? <span style={{ fontSize: '14px', color: 'red' }}>Answer should be at last 3 characters</span> : ''}
				</div>

				<div className="mb-4 d-flex align-items-top ">
					<div jsx="true" className='mt-3'>
						<label className='mb-2' htmlFor="ball">Ball</label>
						<input type="number" className='form-control' id='ball' value={answer.ball} onChange={e => setAnswer({ ...answer, ball: e.target.value })} />
						{error?.ball ? <span style={{ fontSize: '14px', color: 'red' }}>Ball should be at last 1 character and must more than 0</span> : ''}
					</div>
					<div className='mx-2 mt-5'>
						<button type='submit' className='btn btn-primary'>Add answer</button>
					</div>
				</div>
			</form>
		</div>
	)
}
