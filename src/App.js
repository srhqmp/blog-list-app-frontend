import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Notification from './components/Notification'
// import BlogForm from './components/BlogForm'
import Login from './components/Login/Login'
import Blogs from './components/Blogs/Blogs'
import Users from './components/Users'

import { getUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <Login />
      <Blogs />
      <Users />
    </div>
  )
}

export default App
