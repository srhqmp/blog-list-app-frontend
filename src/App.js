import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
// import BlogForm from './components/BlogForm'
import Login from './components/Login/Login'
import Blogs from './components/Blogs'
import Users from './components/Users'

import { initializeBlogs } from './reducers/blogsReducer'
// import { setNotification } from './reducers/notificationReducer'
// import { logout, checkLogin } from './reducers/loginReducer'
import { getUsers } from './reducers/usersReducer'

const App = () => {
  const user = useSelector((state) => state.loggedinUser)
  const dispatch = useDispatch()

  // const handleNotification = (notification, time) => {
  //   dispatch(setNotification(notification, time))
  // }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  // useEffect(() => {
  //   dispatch(checkLogin())
  // }, [dispatch])

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])



  // const loggedinUser = () => (
  //   <div>
  //     {user.name} logged in{' '}
  //     <button id="logout-button" onClick={handleLogout}>
  //       logout
  //     </button>
  //   </div>
  // )

  // const blogFormRef = useRef()
  // const blogForm = () => (
  //   <Togglable buttonLabel="create new blog" ref={blogFormRef}>
  //     <BlogForm blogFormRef={blogFormRef} />
  //   </Togglable>
  // )

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <Login />
      <Blogs user={user} />
      <Users />
    </div>
  )
}

export default App
