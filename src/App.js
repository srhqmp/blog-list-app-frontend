import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import Blogs from './components/Blogs/Blogs'
import Blog from './components/Blogs/Blog'
import Users from './components/Users/Users'
import User from './components/Users/User'

import { createTheme, ThemeProvider } from '@material-ui/core'
import { purple } from '@material-ui/core/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe',
    },
    secondary: purple,
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navigation />
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
    </ThemeProvider>
  )
}

export default App
