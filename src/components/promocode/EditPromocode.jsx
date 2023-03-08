import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { get_promocode } from '../utils/api_fetch'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import AddPromocode from './AddPromocode'

export default function EditPromocode() {
	const { slug } = useParams()
	const [promocode, setPromocode] = useState({
		name: '',
		competition: '',
		percent: ''
	})
	const [edit_id, setEdit_id] = useState(3)
	const [promocodes, setPromocodes] = useState()

	async function promocode_get() {
		try {
			const result = await get_promocode(slug)
			setPromocodes(result.data.results)
			console.log(result.data.results);
		} catch (error) {
			console.log(error);
		}
	}
	function onEdit(id) {
		setEdit_id(id)
	}
	useEffect(() => {
		promocode_get()
	}, [])

	return (
		<div>
			<div className="container">
				<h5 className='text-center py-4'>Promo codes</h5>
				<div>
					<><b>Name of competition: </b>Lider 3.0 olimpiadasi</>
					{promocodes?.map((item, index) => (
						<div key={index}>
							{edit_id? item.id == edit_id ?
								<Edit name={promocode.name} percent={promocode.percent}
									setPromocode={v => setPromocode(v)} /> :
								<div className="d-flex mt-3 align-items-end">
									<div className='w-50 col-6'>
										<label htmlFor="name">Promocode</label>
										<input type="text" className='form-control' id='name' value={item.name}
											onChange={e => setPromocode({ ...promocode, [e.target.id]: e.target.value })}
											maxLength='5' style={{ textTransform: 'uppercase' }} disabled />
									</div>
									<div className='px-3 col-4'>
										<label htmlFor="percent">Percent %</label>
										<input type="text" className='form-control' id='percent' value={item.percent}
											onChange={e => setPromocode({ ...promocode, [e.target.id]: e.target.value })} disabled />
									</div>
									<div className='col-2'>
										<button className='btn btn-sm btn-primary' onClick={() => onEdit(item.id)}><ModeEditOutlineIcon /></button>
									</div>
								</div>:''
							}
						</div>
					))}
				</div>
			</div>
			<AddPromocode />
		</div>
	)
}



function Edit(props) {


	const onchage = (e) => {
		props.setPromocode({ ...props.promocode, [e.target.id]: e.target.value });
	}

	return (
		<div className="d-flex mt-3 align-items-end">
			<div className='w-50 col-6'>
				<label htmlFor="name">Promocode</label>
				{console.log(props)}
				<input type="text" className='form-control' id='name' value={props}
					onChange={e => onchage(e)}
					maxLength='5' style={{ textTransform: 'uppercase' }} />
			</div>
			<div className='px-3 col-4'>
				<label htmlFor="percent">Percent %</label>
				<input type="text" className='form-control' id='percent' value={props.percent}
					onChange={e => onchage(e)} />
			</div>
			<div className='col-2'>
				<button className='btn btn-sm btn-primary'><ModeEditOutlineIcon /></button>
			</div>
		</div>
	)
}
