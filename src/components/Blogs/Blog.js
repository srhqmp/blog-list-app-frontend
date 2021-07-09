import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../../reducers/blogsReducer'
import { likeBlog, removeBlog } from '../../reducers/blogsReducer'
import { checkLogin } from '../../reducers/loginReducer'

const Blog = () => {
  const { id } = useParams()
  const loggedinUser = useSelector((state) => state.loggedinUser)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(checkLogin())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((blog) => blog.id === id)

  const handleLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(likeBlog(updatedBlog))
  }

  const handleRemoveBlog = () => {
    const id = blog.id
    dispatch(removeBlog(id))
    history.push('')
  }

  const likeBtn = () => (
    <button id="likeButton" onClick={handleLikes}>
      like
    </button>
  )

  const displayLikes = (likes) => {
    return (
      <span>
        <span> {likes} </span>
        <span> {likes > 1 ? ' likes' : ' like'} </span>
        {loggedinUser &&
          loggedinUser.username !== blog.user.username &&
          likeBtn()}
      </span>
    )
  }

  const removeBtn = () => {
    return (
      <button id="removeButton" onClick={handleRemoveBlog}>
        remove
      </button>
    )
  }

  const displayComments = (comments) => {
    return (
      <div>
        <h3>comments</h3>
        {comments ? (
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        ) : (
          'Be the first one to comment on this blog'
        )}
      </div>
    )
  }

  return (
    <div>
      <h2>{blog && blog.title}</h2>
      <div>
        <div>
          {blog && (
            <a href={blog.url} target="_blank" rel="noreferrer">
              {blog.url}
            </a>
          )}
        </div>
        <div>{blog && loggedinUser && displayLikes(blog.likes)}</div>
        <div>{blog && `added by ${blog.author}`}</div>
        {blog && loggedinUser && removeBtn()}
        {blog && displayComments(blog.comments)}
      </div>
    </div>
  )
}

export default Blog
