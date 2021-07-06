import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogsReducer'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
  width: '400px',
}

const BlogList = ({ blog, user }) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const handleLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(updateBlog(updatedBlog))
  }

  const handleRemoveBlog = () => {
    const id = blog.id
    dispatch(removeBlog(id))
  }

  return (
    <div style={blogStyle}>
      <div>
        <span className="blogTitle">{blog.title}</span>{' '}
        <span className="blogAuthor">{blog.author}</span>
      </div>
      <button id="toggleVisibilityButton" onClick={toggleVisible}>
        {visible ? 'hide' : 'show'}
      </button>
      <div style={showWhenVisible} className="blogDetails">
        <div className="blogUrl">{blog.url}</div>
        <div className="blogLikes">
          {blog.likes}
          {blog.likes > 1 ? ' likes' : ' like'}
          {user && (
            <button id="likeButton" onClick={handleLikes}>
              like
            </button>
          )}
        </div>
        <div>{blog.user.name}</div>
        {user && user.username === blog.username ? (
          <button id="removeButton" onClick={handleRemoveBlog}>
            remove
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

const Blogs = ({ user }) => {
  const blogs = useSelector((state) => state.blogs)
  return blogs.map((blog) => <BlogList key={blog.id} blog={blog} user={user} />)
}

export default Blogs
