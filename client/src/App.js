import { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import './App.css'
import LoginForm from './components/auth/LoginForm'
import RegisterForm from './components/auth/RegisterForm'
import { AuthContext } from './contexts/AuthContext'
import Dashboard from './views/Dashboard'
import Loading from './components/layout/Loading'
import About from './views/About'


function App() {

  const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext)

  let body

  if (authLoading) {
    body = (
      <Loading />
    )
  } else if (isAuthenticated) {
    return body = (
      <Router>
        <Routes>
          <Route exact path='/' element={<Navigate replace to="/login" />} />
          <Route exact path='/:flug' element={<Navigate replace to="/dashboarb" />} />
          <Route exact path='/dashboarb' element={<Dashboard />} />
          <Route exact path='/about' element={<About />} />
        </Routes>
      </Router>
    )
  } else {
    body = (
      <Router>
        <Routes>
          <Route exact path='/:flug' element={<Navigate replace to="/login" />} />
          <Route exact path='/login' element={<LoginForm />} />
          <Route exact path='/register' element={<RegisterForm />} />
          <Route exact path='/dashboarb' element={isAuthenticated ? <Dashboard /> : <Navigate replace to="/login" />} />
        </Routes>
      </Router>
    )
  }


  return (
    <>
      {body}
    </>
  )
}

export default App
