import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title and author', () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'Test Url',
    user: { name: 'Test Username' },
    likes: 500,
  }

  const mockFunc = jest.fn()

  const component = render(
    <Blog blog={blog} updateBlog={mockFunc} handleBlogRemove={mockFunc} />
  )

  const blogTitle = component.container.querySelector('.blogTitle')
  const blogAuthor = component.container.querySelector('.blogAuthor')
  const blogDetails = component.container.querySelector('.blogDetails')

  expect(blogTitle).toHaveTextContent('Test Title')
  expect(blogAuthor).toHaveTextContent('Test Author')
  expect(blogDetails).toHaveStyle('display: none')
})
