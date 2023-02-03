import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './Main'
import Navbar from './Navbar'
import Forgot from './user/Forgot'
import Login from './user/Login'
import Register from './user/Register'
import SetPassword from './user/SetPassword'
import Verify from './user/Verify'


export default function Router() {
  return (
    <div>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/register' element={<Register />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot' element={<Forgot />} />
          <Route path='/setpassword' element={<SetPassword />} />
        </Routes>

      </BrowserRouter>

    </div>
  )
}
