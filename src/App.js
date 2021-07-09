import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notification from './components/Notification'
import Login from './components/Login/Login'
import Blogs from './components/Blogs/Blogs'
import Users from './components/Users/Users'

const App = () => {
  return (
    <Router>
      <h2>blogs</h2>
      <Notification />
      <Login />
      <Switch>
        <Route exact path="/">
          <Blogs />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
