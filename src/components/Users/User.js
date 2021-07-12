import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../reducers/usersReducer'

const User = () => {
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
    <div>
      <h3>{user && user.name}</h3>
      <div>
        <h4>added blogs</h4>
        {user && displayBlogs()}
      </div>
    </div>
  )
}

export default User
