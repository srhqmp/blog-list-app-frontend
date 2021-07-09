import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../../hooks'

import { login } from '../../reducers/loginReducer'

const LoginForm = ({ loginFormRef }) => {
  const dispatch = useDispatch()

  const usernameInput = useField('text')
  const passwordInput = useField('password')

  const handleLogin = (e) => {
    e.preventDefault()
    const userObj = {
      username: usernameInput.value,
      password: passwordInput.value,
    }
    dispatch(login(userObj))
    usernameInput.onReset()
    passwordInput.onReset()
    loginFormRef.current.toggleVisible()
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input {...usernameInput} required />
      </div>
      <div>
        password:
        <input {...passwordInput} required />
      </div>
      <button>login</button>
    </form>
  )
}

export default LoginForm
