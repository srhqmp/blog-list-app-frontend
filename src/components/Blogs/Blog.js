import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import {
  initializeBlogs,
  likeBlog,
  removeBlog,
  addComment,
} from '../../reducers/blogsReducer'
import { checkLogin } from '../../reducers/loginReducer'
import { useField } from '../../hooks'
import { Container, TextField, Button, Typography } from '@material-ui/core'
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
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(10),
  },
}))

const Blog = () => {
  const classes = useStyles()
  const { id } = useParams()

  const dispatch = useDispatch()
  const history = useHistory()
  const commentInput = useField('text')

  const loggedinUser = useSelector((state) => state.loggedinUser)
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
    <Button
      id="likeButton"
      onClick={handleLikes}
      variant="contained"
      color="primary"
    >
      like
    </Button>
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
      <Button
        id="removeButton"
        variant="contained"
        color="primary"
        onClick={handleRemoveBlog}
      >
        remove
      </Button>
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
        <div>
          <TextField
            {...commentInput}
            required
            id="outlined-multiline-static"
            label="Add Comment"
            multiline
            rows={4}
            defaultValue="Default Value"
            variant="outlined"
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          add comment
        </Button>
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
        <Typography variant="h4" component="h2">
          {blog && blog.title}
        </Typography>
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
