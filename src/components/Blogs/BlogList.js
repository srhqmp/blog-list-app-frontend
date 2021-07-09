import React from 'react'
import { Link } from 'react-router-dom'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
  width: '400px',
}

const BlogList = ({ blog }) => {
  return (
    <div style={blogStyle}>
      <div>
        <Link to={`/blogs/${blog.id}`}>
          <span className="blogTitle">{blog.title}</span>
          {' by '}
          <span className="blogAuthor">{blog.author}</span>
        </Link>
      </div>
    </div>
  )
}

export default BlogList
