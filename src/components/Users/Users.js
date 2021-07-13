import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../reducers/usersReducer'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

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
  table: {
    width: '100%',
  },
}))

const UserList = ({ user }) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </TableCell>
      <TableCell align="right">{user.blogs.length}</TableCell>
    </TableRow>
  )
}

const Users = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  const users = useSelector((state) => state.users)
  if (users) {
    return (
      <Container className={(classes.content, classes.appBar)}>
        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="simple table" size="medium">
            <TableHead>
              <TableRow>
                <TableCell>{''}</TableCell>
                <TableCell align="right">Blogs Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <UserList key={user.id} user={user} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    )
  } else {
    return <div></div>
  }
}

export default Users
