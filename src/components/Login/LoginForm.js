import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../../hooks'
import { login } from '../../reducers/loginReducer'

import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  button: {
    padding: '5px 0px',
  },
  disp: {
    display: 'inline',
    padding: '50px 0px',
  },
}))

const LoginForm = ({ loginFormRef }) => {
  const classes = useStyles()
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
    <form
      onSubmit={handleLogin}
      className={(classes.root, classes.disp)}
      noValidate
      autoComplete="off"
    >
      <div>Login User</div>
      <div>
        <TextField
          label="Username"
          id="standard-required"
          {...usernameInput}
          required
        />
      </div>
      <div>
        <TextField
          label="Password"
          id="standard-required"
          {...passwordInput}
          required
        />
      </div>
      <Button type="submit" color="primary" variant="contained">
        login
      </Button>
    </form>
  )
}

export default LoginForm
