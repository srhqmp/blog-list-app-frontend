import React, { useState } from 'react'
import PropType from 'prop-types'
import { useDispatch } from 'react-redux'

import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'

const LoginForm = ({ loginFormRef }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    const userObject = {
      username,
      password,
    }
    try {
      loginFormRef.current.toggleVisible()
      dispatch(login(userObject))
    } catch (e) {
      const notification = {
        message: e,
        classification: 'error',
      }
      dispatch(setNotification(notification, 5))
    }
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username:
        <input
          value={username}
          id="username"
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input
          value={password}
          id="password"
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )
}

LoginForm.propType = {
  login: PropType.func.isRequired,
}

export default LoginForm
