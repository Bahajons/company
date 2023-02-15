import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Logout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    Swal.fire({
        title: 'Do you want to log out ?',
        showLoaderOnConfirm: true,
        showDenyButton: true,
        preConfirm: (email) => {
            localStorage.removeItem('token')
            Swal.fire(
                'Thanks',
                'You loged out',
                'success', {
                preConfirm: () => {
                    return
                }
            }
            )
            dispatch({ type: 'LOGOUT' })
            return navigate('/')
        },
        preDeny: () => {
            return navigate(-1)
        },
        allowOutsideClick: false
    })


    return (
        <div>

        </div>
    )
}
