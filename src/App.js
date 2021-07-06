import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'

import { initializeBlogs } from './reducers/blogsReducer'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  // const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedinUser = window.localStorage.getItem('BlogAppLoggedinUser')
    if (loggedinUser) {
      const user = JSON.parse(loggedinUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleNotification = (notification, time) => {
    dispatch(setNotification(notification, time))
  }

  const loginFormRef = useRef()

  const login = async (userObject) => {
    try {
      loginFormRef.current.toggleVisible()
      const user = await loginService.login(userObject)
      window.localStorage.setItem('BlogAppLoggedinUser', JSON.stringify(user))
      setUser(user)
      const notification = {
        message: `Successfully logged in ${user.name}`,
        classification: 'success',
      }
      handleNotification(notification, 5)
    } catch (e) {
      const notification = {
        message: 'wrong credentials',
        classification: 'error',
      }
      handleNotification(notification, 5)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="login" ref={loginFormRef}>
      <LoginForm login={login} />
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
      setUser(null)
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

  // const updateBlog = async (blog) => {
  //   try {
  //     const updatedBlog = await blogService.updateBlog(blog.id, blog)
  //     setBlogs(
  //       blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
  //     )
  //   } catch (e) {
  //     const notification = {
  //       message: e.response.data.error,
  //       classification: 'error',
  //     }
  //     handleNotification(notification, 5)
  //   }
  // }

  // const handleBlogRemove = async (blog) => {
  //   try {
  //     if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
  //       const request = await blogService.removeBlog(blog.id)
  //       if (request) {
  //         const notification = {
  //           message: request,
  //           classification: 'success',
  //         }
  //         handleNotification(notification, 5)
  //         setBlogs(blogs.filter((blogpost) => blogpost.id !== blog.id))
  //       }
  //     }
  //   } catch (e) {
  //     const notification = {
  //       message: e.response.data.error,
  //       classification: 'error',
  //     }
  //     handleNotification(notification, 5)
  //   }
  // }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ? loginForm() : loggedinUser()}
      {user !== null && blogForm()}
      <Blogs />

      {/* {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          handleBlogRemove={handleBlogRemove}
          user={user}
        />
      ))} */}
    </div>
  )
}

export default App
