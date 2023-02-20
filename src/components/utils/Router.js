import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddCompetition from '../competition/AddCompetition'
import Competition from '../competition/Competition'
import EditCompetition from '../competition/EditCompetition'
import Main from '../Main'
import Navbar from '../Navbar'
import AddQuestion from '../questions/AddQuestion'
import EditQuestion from '../questions/EditQuestion'
import Question from '../questions/Question'
import Forgot from '../user/Forgot'
import Login from '../user/Login'
import Logout from '../user/Logout'
import Profile from '../user/Profile'
import Register from '../user/Register'
import SetPassword from '../user/SetPassword'
import Verify from '../user/Verify'


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
          <Route path='/logout' element={<Logout />} />
          <Route path='/forgot' element={<Forgot />} />
          <Route path='/setpassword' element={<SetPassword />} />

          <Route path='/profile' element={<Profile />} />
          <Route path='/competition' element={<Competition />} />
          <Route path='/competition/add' element={<AddCompetition />} />
          <Route path='/competition/:slug' element={<EditCompetition />} />
          <Route path='/questions/:slug' element={<Question />} />
          <Route path='/question/add/:slug' element={<AddQuestion />} />
          <Route path='/question/edit/:slug/:id' element={<EditQuestion />} />
        </Routes>

      </BrowserRouter>

    </div>
  )
}
