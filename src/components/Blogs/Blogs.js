import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BlogList from './BlogList'

import { checkLogin } from '../../reducers/loginReducer'
import { initializeBlogs } from '../../reducers/blogsReducer'
import Togglable from '../Togglable'
import BlogForm from './BlogForm'

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
      marginTop: '20px',
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
    padding: theme.spacing(3),
  },
}))

const Blogs = () => {
  const classes = useStyles()
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
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm blogFormRef={blogFormRef} />
    </Togglable>
  )

  const blogList = () =>
    blogs.map((blog) => (
      <BlogList key={blog.id} blog={blog} loggedinUser={loggedinUser} />
    ))

  return (
    <Container className={(classes.content, classes.appBar)}>
      {loggedinUser && blogForm()}
      <div className={classes.toolbar}>{blogList()}</div>
    </Container>
  )
}

export default Blogs
