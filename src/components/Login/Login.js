import React, { useRef, useEffect } from 'react'
import LoginForm from './LoginForm'
import Togglable from '../Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { checkLogin, logout } from '../../reducers/loginReducer'
import { handleSuccess } from '../../reducers/notificationReducer'
import { makeStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const useStyles = makeStyles(() => ({
  logout: {
    marginLeft: '20px',
  },
}))

const Login = () => {
  const classes = useStyles()
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
    <div>
      <div className={classes.logout}>{`${loggedinUser.name} logged in`}</div>{' '}
      <List>
        <ListItem
          button
          // activeStyle={{
          //   backgroundColor: '#ecf0f1',
          // }}
          onClick={handleLogout}
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  )

  const loginFormRef = useRef()
  const loginForm = () => (
    <Togglable buttonLabel='login' ref={loginFormRef}>
      <LoginForm loginFormRef={loginFormRef} />
    </Togglable>
  )
  return <span>{loggedinUser ? userLogout() : loginForm()}</span>
}

export default Login
