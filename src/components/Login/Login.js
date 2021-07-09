import React, { useRef, useEffect } from 'react'
import LoginForm from './LoginForm'
import Togglable from '../Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { checkLogin, logout } from '../../reducers/loginReducer'
import { handleSuccess } from '../../reducers/notificationReducer'
import { Button } from '@material-ui/core'

const Login = () => {
  const loggedinUser = useSelector((state) => state.loggedinUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkLogin())
  }, [dispatch])

  const handleLogout = () => {
    const message = `Successfully logged out ${loggedinUser.username}`
    dispatch(logout())
    handleSuccess(dispatch, message)
  }

  const userLogout = () => (
    <span>
      <span>{`${loggedinUser.name} logged in`}</span>{' '}
      <Button onClick={handleLogout} color="primary" variant="contained">
        logout
      </Button>
    </span>
  )

  const loginFormRef = useRef()
  const loginForm = () => (
    <Togglable buttonLabel="login" ref={loginFormRef}>
      <LoginForm loginFormRef={loginFormRef} />
    </Togglable>
  )

  return <span>{loggedinUser ? userLogout() : loginForm()}</span>
}

export default Login
