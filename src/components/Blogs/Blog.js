import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../../reducers/blogsReducer'
import { likeBlog, removeBlog, addComment } from '../../reducers/blogsReducer'
import { checkLogin } from '../../reducers/loginReducer'
import { useField } from '../../hooks'

import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      marginTop: '50px',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(10),
  },
}))

const Blog = () => {
  const classes = useStyles()
  const { id } = useParams()
  const loggedinUser = useSelector((state) => state.loggedinUser)
  const dispatch = useDispatch()
  const history = useHistory()
  const commentInput = useField('text')

  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((blog) => blog.id === id)

  useEffect(() => {
    dispatch(checkLogin())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(likeBlog(updatedBlog))
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

  const handleRemoveBlog = () => {
    const id = blog.id
    dispatch(removeBlog(id))
    history.push('')
  }

  const removeBtn = () => {
    return (
      <button id="removeButton" onClick={handleRemoveBlog}>
        remove
      </button>
    )
  }

  const handleComment = (e) => {
    e.preventDefault()
    const blogObj = {
      id: blog.id,
      comment: commentInput.value,
    }
    dispatch(addComment(blogObj))
    commentInput.onReset()
  }

  const inputAddComment = () => {
    return (
      <form onSubmit={handleComment}>
        <input {...commentInput} required />
        <button>add comment</button>
      </form>
    )
  }

  const displayComments = (comments) => {
    return (
      <div>
        <h3>comments</h3>
        {inputAddComment()}
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
    <Container className={(classes.content, classes.appBar)}>
      <div className={classes.toolbar}>
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
    </Container>
  )
}

export default Blog
