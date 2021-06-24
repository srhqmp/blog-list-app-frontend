import React, { useState } from 'react'
import PropType from 'prop-types'

const BlogForm = ({ addNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()

    const blog = {
      title,
      author,
      url,
    }
    addNewBlog(blog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form id="blogForm" onSubmit={handleNewBlog}>
      <h2>create new</h2>
      <div>
        title:{' '}
        <input
          id="title"
          type="text"
          name="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:{' '}
        <input
          id="author"
          type="text"
          name="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:{' '}
        <input
          id="url"
          type="text"
          name="Url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id="create-blog" type="submit">
        create
      </button>
    </form>
  )
}

BlogForm.propType = {
  addNewBlog: PropType.func.isRequired,
}

export default BlogForm
