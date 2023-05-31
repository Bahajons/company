import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { delete_promocode, get_promocode, patch_promocode } from '../utils/api_fetch'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPromocode from './AddPromocode'

export default function EditPromocode() {
	const { slug, price } = useParams()
	const [promocode, setPromocode] = useState({
		name: '',
		percent: ''
	})
	const [edit_id, setEdit_id] = useState()
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

	async function promocode_update() {
		try {
			const result = await patch_promocode(slug, edit_id, promocode)
			console.log(result);
			setEdit_id('')
			promocode_get()
		} catch (error) {
			console.log(error);
		}
	}

	async function promocode_delete() {
		try {
			const result = await delete_promocode(slug, edit_id)
			setEdit_id('')
			console.log(result);
			promocode_get()
		} catch (error) {
			console.log(error);
		}
	}



	function onEdit(id) {
		setEdit_id(id)
		setPromocode({ ...promocode, ...promocodes.filter(item => item.id == id)[0] })
		console.log(promocodes.filter(item => item.id == id));
	}
	useEffect(() => {
		promocode_get()
	}, [])

	return (
		<div>
			<div className="container">
				<h5 className='text-center py-4'>Promo codes</h5>
				<div>
					{console.log(promocode)}
					<><b>Name of competition: </b>Lider 3.0 olimpiadasi</>
					{promocodes?.map((item, index) => (
						<div key={index}>
							{edit_id && item.id == edit_id ?
								<Edit name={promocode.name} percent={promocode.percent}
									setPromocode={v => setPromocode({ ...promocode, ...v })}
									update={promocode_update} delete={promocode_delete}
								/> :
								<>
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
											<button className='btn btn-sm btn-primary' onClick={() => onEdit(item.id)} disabled={edit_id ? true : false}><ModeEditOutlineIcon /></button>
										</div>
									</div>
									<p>Price: {price} so'm, after promocode: {price - price * item.percent / 100} so'm</p>
								</>
							}
						</div>
					))}
				</div>
			</div>
			<AddPromocode get={() => promocode_get()} />
		</div>
	)
}



function Edit(props) {


	const onchage = (e) => {
		props.setPromocode({ ...props.promocode, [e.target.id]: e.target.value });
	}

	return (
		<div className="row mt-3 align-items-end">
			{console.log(props)}
			<div className='w-50 col-6'>
				<label htmlFor="name">Promocode</label>
				<input type="text" className='form-control' id='name' value={props.name}
					onChange={e => onchage(e)}
					maxLength='5' style={{ textTransform: 'uppercase' }} />
			</div>
			<div className='px-3 col-4'>
				<label htmlFor="percent">Percent %</label>
				<input type="text" className='form-control' id='percent' value={props.percent}
					onChange={e => onchage(e)} />
			</div>
			<div className='mt-3'>
				<div className="d-flex">
					<button className='btn btn-sm btn-success' onClick={() => props.update()}><SaveIcon /></button>
					<button className='btn btn-sm btn-danger mx-2' onClick={() => props.delete()}><DeleteIcon /></button>
				</div>
			</div>
		</div>
	)
}
