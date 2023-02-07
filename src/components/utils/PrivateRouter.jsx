import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRouter() {

    const token = localStorage.getItem('token')

    return (
        false ? <Outlet /> : <Navigate to='/login' />
    )
}
