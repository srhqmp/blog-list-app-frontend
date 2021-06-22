import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, handleBlogRemove, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: '400px',
  }

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const handleLikes = () => {
    blog.likes += 1
    updateBlog(blog)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={toggleVisible}>{visible ? 'hide' : 'show'}</button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          {blog.likes} likes <button onClick={handleLikes}>like</button>
        </div>
        <div>{blog.author}</div>
        {user && user.username === blog.user.username ? (
          <button onClick={() => handleBlogRemove(blog)}>remove</button>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Blog
