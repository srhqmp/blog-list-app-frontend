import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('With initial blog post', () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'Test Url',
    user: { name: 'Test Username' },
    likes: 500,
  }

  let component

  beforeEach(() => {
    const mockFunc = jest.fn()
    component = render(
      <Blog blog={blog} updateBlog={mockFunc} handleBlogRemove={mockFunc} />
    )
  })

  test('renders blog title and author', () => {
    const blogTitle = component.container.querySelector('.blogTitle')
    const blogAuthor = component.container.querySelector('.blogAuthor')
    const blogDetails = component.container.querySelector('.blogDetails')

    expect(blogTitle).toHaveTextContent('Test Title')
    expect(blogAuthor).toHaveTextContent('Test Author')
    expect(blogDetails).toHaveStyle('display: none')
  })

  test('displays blog likes and blog url after click the show button', () => {
    const showButton = component.container.querySelector(
      '#toggleVisibilityButton'
    )
    fireEvent.click(showButton)
    const blogDetails = component.container.querySelector('.blogDetails')
    expect(blogDetails).not.toHaveStyle('display: none')
    expect(showButton).toHaveTextContent('hide')
  })
})
