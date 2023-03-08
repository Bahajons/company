import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { get_answer_detail } from '../utils/api_fetch'
import MathShow from '../utils/MathShow';

export default function Answer(props) {
	const [answer, setAnswer] = useState()
	const { slug, id } = useParams()
	const selector = useSelector(state => state)
	const alph = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X']

	async function answer_get() {
		if (slug.length > 2 && id) {
			try {
				const result = await get_answer_detail(slug, id)
				console.log(result);
				setAnswer(result.data.results)
			} catch (error) {
				console.log(error);
			}
		}
	}

	useEffect(() => {
		answer_get()
	}, [selector.add_answer])


	return (
		<div>
			<div className="container">
				{answer ?
					answer?.map((item, index) => {
						return (
							<div className="d-flex" key={index}>
								<h5 className='mr-3'>{alph[index]}{')'}</h5>
								<div key={index} className='w-100 px-2'>
									<MathShow text={item?.name} />
									<>
										{item.ball > 0 ?
											<i style={{ color: '#59FF00' }}>{'Ball:'} {item?.ball}</i> :
											<i style={{ color: '#ff0000' }}>{'Ball:'} {item?.ball}</i>
										}
									</>
									<hr className='mt-1 mb-3' style={{ color: '#a1a1a1' }} />
								</div>
							</div>)
					}) : ''}
			</div>
		</div>
	)
}
