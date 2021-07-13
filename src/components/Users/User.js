import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../reducers/usersReducer'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

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
  listStyle: {
    textDecoration: 'none',
    marginBottom: '5px',
  },
}))

const User = () => {
  const classes = useStyles()
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  const users = useSelector((state) => state.users)
  const user = users && users.find((user) => user.id === id)

  const displayBlogs = () => {
    if (user.blogs.length) {
      return (
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>
              <Typography variant="h6">
                <Link to={`/blogs/${blog.id}`} className={classes.listStyle}>
                  {blog.title}
                </Link>
              </Typography>
            </li>
          ))}
        </ul>
      )
    } else {
      return <div>No blogs to show</div>
    }
  }
  return (
    <Container className={(classes.content, classes.appBar)}>
      <h3>{user && user.name}</h3>
      <div>
        <h4>added blogs</h4>
        {user && displayBlogs()}
      </div>
    </Container>
  )
}

export default User
