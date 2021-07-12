import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CreateIcon from '@material-ui/icons/Create'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  cancelBtn: {
    marginLeft: '5px',
  },
}))

const Togglable = React.forwardRef((props, ref) => {
  const classes = useStyles()

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisible }
  })

  return (
    <div style={{ padding: '10px 20px' }}>
      <span style={hideWhenVisible}>
        <List>
          <ListItem
            button
            activeStyle={{
              backgroundColor: '#ecf0f1',
            }}
            onClick={toggleVisible}
          >
            <ListItemIcon>
              {props.buttonLabel === 'login' ? (
                <AccountCircleIcon />
              ) : (
                <CreateIcon />
              )}
            </ListItemIcon>
            <ListItemText primary={props.buttonLabel} />
          </ListItem>
        </List>
      </span>
      <span style={showWhenVisible}>
        {props.children}
        <Button
          variant="contained"
          onClick={toggleVisible}
          color="primary"
          style={showWhenVisible}
          className={classes.cancelBtn}
        >
          Cancel
        </Button>
      </span>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
