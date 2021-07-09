import React from 'react'
import { Link } from 'react-router-dom'
import Login from './Login/Login'
import { Typography } from '@material-ui/core'

const Navigation = () => {
  return (
    <Typography variant="h5" color="primary" gutterBottom align="left">
      <Link to={'/'} style={{ textDecoration: 'none' }}>
        blogs
      </Link>{' '}
      <Link to={'/users'} style={{ textDecoration: 'none' }}>
        users
      </Link>{' '}
      <Login />
    </Typography>
  )
}

export default Navigation
