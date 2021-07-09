import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BlogList from './BlogList'

import { checkLogin } from '../../reducers/loginReducer'
import { initializeBlogs } from '../../reducers/blogsReducer'
import Togglable from '../Togglable'
import BlogForm from './BlogForm'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const loggedinUser = useSelector((state) => state.loggedinUser)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkLogin())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm blogFormRef={blogFormRef} />
    </Togglable>
  )

  const blogList = () =>
    blogs.map((blog) => (
      <BlogList key={blog.id} blog={blog} loggedinUser={loggedinUser} />
    ))

  return (
    <div>
      {loggedinUser && blogForm()}
      {blogList()}
    </div>
  )
}

export default Blogs
