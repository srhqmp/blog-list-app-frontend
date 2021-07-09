import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import Blogs from './components/Blogs/Blogs'
import Blog from './components/Blogs/Blog'
import Users from './components/Users/Users'
import User from './components/Users/User'
import { Container } from '@material-ui/core'

const App = () => {
  return (
    <Container>
      <Router>
        <Navigation />
        <h2>blog app</h2>
        <Notification />
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
    </Container>
  )
}

export default App
