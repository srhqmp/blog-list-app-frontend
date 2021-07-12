import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../reducers/usersReducer'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(10),
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
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      )
    } else {
      return <div>No blogs to show</div>
    }
  }
  return (
    <Container className={classes.content}>
      <h3>{user && user.name}</h3>
      <div>
        <h4>added blogs</h4>
        {user && displayBlogs()}
      </div>
    </Container>
  )
}

export default User
