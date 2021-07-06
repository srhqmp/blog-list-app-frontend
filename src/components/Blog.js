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

const Blog = (user) => {
  const blogs = useSelector((state) => state.blogs)
  // const user = true
  // // const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const handleLikes = () => {
    console.log('hi')
  }

  return blogs.map((blog) => (
    <div style={blogStyle} key={blog.id}>
      <div>
        <span className="blogTitle">
          {blog.title}
          {'hi'}
        </span>{' '}
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
          <button id="removeButton" onClick={() => {}}>
            remove
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  ))
}

export default Blog
