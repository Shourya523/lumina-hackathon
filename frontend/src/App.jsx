import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/SignUp.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import SignIn from './pages/SignIn.jsx'
import { useSelector } from 'react-redux'
import './index.css'

function App() {
  const { currentUser } = useSelector(state => state.user);

  return (
    <>
    <Routes>
        {/* <Route path="/" element={<MainPage />} /> */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        {currentUser ? (
          <Route path="/profile" element={<ProfilePage />} />
        ) : (
          <Route path="/profile" element={<Signup />} />
        )}
      </Routes>
    </>
  )
}

export default App
