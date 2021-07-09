import React from 'react'
import PropType from 'prop-types'
import { useDispatch } from 'react-redux'
import { useField } from '../../hooks'

import { addBlog } from '../../reducers/blogsReducer'

const BlogForm = ({ blogFormRef }) => {
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
    <form id="blogForm" onSubmit={handleNewBlog}>
      <h2>create new</h2>
      <div>
        title:
        <input {...titleInput} required />
      </div>
      <div>
        author:
        <input {...authorInput} required />
      </div>
      <div>
        url:
        <input {...urlInput} required />
      </div>
      <button>submit</button>
    </form>
  )
}

BlogForm.propType = {
  addNewBlog: PropType.func.isRequired,
}

export default BlogForm
