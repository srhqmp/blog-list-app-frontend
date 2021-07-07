import blogsService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.content
    case 'ADD_BLOG':
      return state.concat(action.content)
    case 'REMOVE_BLOG':
      return state.filter((blog) => blog.id !== action.content.id)
    case 'UPDATE_BLOG':
      return state.map((blog) =>
        blog.id === action.content.id ? action.content : blog
      )
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      content: blogs.sort((a, b) => parseInt(b.likes) - parseInt(a.likes)),
    })
  }
}

export const addBlog = (data) => {
  return async (dispatch) => {
    try {
      const res = await blogsService.create(data)
      console.log(res)
      dispatch({
        type: 'ADD_BLOG',
        content: res,
      })
      console.log('succss')
    } catch (e) {
      console.log(e)
    }
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogsService.removeBlog(id)
    dispatch({
      type: 'REMOVE_BLOG',
      content: { id },
    })
  }
}

export const updateBlog = (data) => {
  return async (dispatch) => {
    const res = await blogsService.updateBlog(data.id, data)
    dispatch({
      type: 'UPDATE_BLOG',
      content: res,
    })
  }
}

export default reducer
