import React, { useRef, useEffect } from 'react'
import LoginForm from './LoginForm'
import Togglable from '../Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { checkLogin, logout } from '../../reducers/loginReducer'
import { setNotification } from '../../reducers/notificationReducer'

const Login = () => {
  const loggedinUser = useSelector((state) => state.loggedinUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkLogin())
  }, [dispatch])

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(
      setNotification(
        {
          message: `Successfully logged out ${loggedinUser.username}`,
          classification: 'success',
        },
        5
      )
    )
    dispatch(logout())
  }

  const userLogout = () => (
    <div>
      {`${loggedinUser.username}`}{' '}
      <button onClick={handleLogout}>logout</button>
    </div>
  )

  const loginFormRef = useRef()
  const loginForm = () => (
    <Togglable buttonLabel="login" ref={loginFormRef}>
      <LoginForm loginFormRef={loginFormRef} />
    </Togglable>
  )

  return <div>{loggedinUser ? userLogout() : loginForm()}</div>
}

export default Login
