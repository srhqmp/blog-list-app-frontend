import React from 'react'
import PropType from 'prop-types'
import { useDispatch } from 'react-redux'
import { useField } from '../../hooks'

import { addBlog } from '../../reducers/blogsReducer'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  button: {
    padding: '5px 0px',
  },
  disp: {
    display: 'inline',
    padding: '50px 0px',
  },
  authorInput: {
    position: 'relative',
    left: '-20px',
    width: '60%',
    marginBottom: '10px',
    minWidth: '300px',
  },
  urlInput: {
    position: 'relative',
    left: '5px',
    width: '60%',
    marginBottom: '20px',
    minWidth: '300px',
  },
  titleField: {
    width: '60%',
    marginBottom: '10px',
    minWidth: '300px',
  },
}))

const BlogForm = ({ blogFormRef }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const titleInput = useField('text')
  const authorInput = useField('text')
  const urlInput = useField('text')

  const handleNewBlog = (event) => {
    event.preventDefault()

    const blogObj = {
      title: titleInput.value,
      author: authorInput.value,
      url: urlInput.value,
    }
    dispatch(addBlog(blogObj))
    titleInput.onReset()
    authorInput.onReset()
    urlInput.onReset()
    blogFormRef.current.toggleVisible()
  }

  return (
    <form
      id="blogForm"
      onSubmit={handleNewBlog}
      className={(classes.root, classes.disp)}
      noValidate
      autoComplete="off"
    >
      <h2>create new</h2>
      <div>
        title:
        <TextField
          label="Title"
          className={classes.titleField}
          {...titleInput}
          required
        />
      </div>
      <div>
        author:
        <TextField
          label="Author"
          className={classes.authorInput}
          {...authorInput}
          required
        />
      </div>
      <div>
        url:
        <TextField
          label="URL"
          className={classes.urlInput}
          {...urlInput}
          required
        />
      </div>
      <Button type="submit" color="primary" variant="contained">
        create
      </Button>
    </form>
  )
}

BlogForm.propType = {
  addNewBlog: PropType.func.isRequired,
}

export default BlogForm
