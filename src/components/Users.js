import React from 'react'
import { useSelector } from 'react-redux'

const UserList = ({ user }) => {
  console.log('user:', user.username, user.blogs.length)
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

const Users = () => {
  const users = useSelector((state) => state.users)
  console.log('users:', users)
  if (users) {
    return (
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserList key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    )
  } else {
    return <div></div>
  }
}

export default Users
