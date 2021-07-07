import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'

import { initializeBlogs } from './reducers/blogsReducer'
import { setNotification } from './reducers/notificationReducer'
import { logout, checkLogin } from './reducers/loginReducer'

const App = () => {
  const user = useSelector((state) => state.loggedinUser)
  const dispatch = useDispatch()
  console.log('app user:', user)

  const handleNotification = (notification, time) => {
    dispatch(setNotification(notification, time))
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(checkLogin())
  }, [dispatch])

  const loginFormRef = useRef()

  const loginForm = () => (
    <Togglable buttonLabel="login" ref={loginFormRef}>
      <LoginForm loginFormRef={loginFormRef} user={user} />
    </Togglable>
  )

  const handleLogout = () => {
    try {
      window.localStorage.clear()
      const notification = {
        message: `Logged out ${user.name}`,
        classification: 'success',
      }
      handleNotification(notification, 5)
      dispatch(logout())
    } catch (e) {
      const notification = {
        message: e.response.data.error,
        classification: 'error',
      }
      handleNotification(notification, 5)
    }
  }

  const loggedinUser = () => (
    <div>
      {user.name} logged in{' '}
      <button id="logout-button" onClick={handleLogout}>
        logout
      </button>
    </div>
  )

  const blogFormRef = useRef()
  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm blogFormRef={blogFormRef} />
    </Togglable>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user && blogForm()}
      {user ? loggedinUser() : loginForm()}
      <Blogs user={user} />
    </div>
  )
}

export default App
