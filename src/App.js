import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import Login from './components/Login/Login'
import Blogs from './components/Blogs/Blogs'
import Blog from './components/Blogs/Blog'
import Users from './components/Users/Users'
import User from './components/Users/User'

const App = () => {
  return (
    <Router>
      <Navigation />
      <h2>blog app</h2>
      <Notification />
      <Login />
      <Switch>
        <Route exact path="/">
          <Blogs />
        </Route>
        <Route exact path="/blogs/:id">
          <Blog />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route exact path="/users/:id">
          <User />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
