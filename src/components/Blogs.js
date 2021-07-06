import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
  width: '400px',
}

const BlogList = ({ blog }) => {
  const user = true
  // // const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const handleLikes = () => {
    console.log('hi')
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
          <button
            id="removeButton"
            onClick={() => {
              console.log('heyhey')
            }}
          >
            remove
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  return blogs.map((blog) => <BlogList key={blog.id} blog={blog} />)
}

export default Blogs
