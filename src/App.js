import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState({
    message: null,
    classification: null,
  })

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        setBlogs(blogs.sort((a, b) => parseInt(b.likes) - parseInt(a.likes)))
      )
  }, [])

  useEffect(() => {
    const loggedinUser = window.localStorage.getItem('BlogAppLoggedinUser')
    if (loggedinUser) {
      const user = JSON.parse(loggedinUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleNotification = (message, classification) => {
    const notif = {
      message,
      classification,
    }
    setNotification(notif)
    setTimeout(() => {
      setNotification({
        message: null,
        classification: null,
      })
    }, 5000)
  }

  const loginFormRef = useRef()

  const login = async (userObject) => {
    try {
      loginFormRef.current.toggleVisible()
      const user = await loginService.login(userObject)
      window.localStorage.setItem('BlogAppLoggedinUser', JSON.stringify(user))
      setUser(user)
      handleNotification(`Successfully logged in ${user.name}`, 'success')
    } catch (e) {
      handleNotification(e.response.data.error, 'error')
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
      handleNotification(`Logged out ${user.name}`, 'success')
      setUser(null)
    } catch (e) {
      handleNotification(e.response.data.error, 'error')
    }
  }

  const loggedinUser = () => (
    <div>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </div>
  )

  const blogFormRef = useRef()

  const addNewBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisible()
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      handleNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        'success'
      )
    } catch (e) {
      handleNotification(e.response.data.error, 'error')
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm addNewBlog={addNewBlog} />
    </Togglable>
  )

  const updateBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.updateBlog(blog.id, blog)
      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      )
    } catch (e) {
      handleNotification(e.response.data.error, 'error')
    }
  }

  const handleBlogRemove = async (blog) => {
    try {
      if (user) {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
          const request = await blogService.removeBlog(blog.id)
          if (request) {
            handleNotification(request, 'success')
            setBlogs(blogs.filter((blogpost) => blogpost.id !== blog.id))
          }
        }
      } else {
        handleNotification('You must sign in to delete a blog', 'error')
      }
    } catch (e) {
      handleNotification(e.response.data.error, 'error')
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message={notification['message']}
        classification={notification['classification']}
      />
      {user === null ? loginForm() : loggedinUser()}
      {user !== null && blogForm()}

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          handleBlogRemove={handleBlogRemove}
          user={user}
        />
      ))}
    </div>
  )
}

export default App
