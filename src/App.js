import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState({
    message: null,
    classification: null,
  })

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('BlogAppLoggedinUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      handleNotification(`Successfully logged in ${user.name}`, 'success')
    } catch (e) {
      handleNotification(e.response.data.error, 'error')
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username:
        <input
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
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

  const handleNewBlog = async (event) => {
    event.preventDefault()

    try {
      const blog = {
        title,
        author,
        url,
      }
      const newBlog = await blogService.create(blog)
      console.log(newBlog)
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      handleNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        'success'
      )
    } catch (e) {
      handleNotification(e.response.data.error, 'error')
    }
  }

  const blogForm = () => (
    <form onSubmit={handleNewBlog}>
      <h2>create new</h2>
      <div>
        title:{' '}
        <input
          type="text"
          name="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:{' '}
        <input
          type="text"
          name="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:{' '}
        <input
          type="text"
          name="Url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

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
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
