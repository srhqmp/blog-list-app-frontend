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
      <div>
        <span className="blogTitle">{blog.title}</span>{' '}
        <span className="blogAuthor">{blog.author}</span>
      </div>
      <button id="toggleVisibilityButton" onClick={toggleVisible}>{visible ? 'hide' : 'show'}</button>
      <div style={showWhenVisible} className="blogDetails">
        <div className="blogUrl">{blog.url}</div>
        <div className="blogLikes">
          {blog.likes}
          {blog.likes > 1 ? ' likes' : ' like'}
          {user && <button id="likeButton" onClick={handleLikes}>like</button>}
        </div>
        <div>{blog.user.name}</div>
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
