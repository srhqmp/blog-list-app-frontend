import loginService from '../services/login'
import blogService from '../services/blogs'
import { handleSuccess, handleError } from './notificationReducer'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'CHECK_LOGIN':
      return action.content
    case 'LOGIN': {
      return action.content
    }
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const checkLogin = () => {
  return async (dispatch) => {
    try {
      const user = window.localStorage.getItem('BlogAppLoggedinUser')
      if (user) {
        const parsedUser = JSON.parse(user)
        blogService.setToken(user.token)
        dispatch({
          type: 'CHECK_LOGIN',
          content: parsedUser,
        })
      } else {
        window.localStorage.clear()
      }
    } catch (e) {
      handleError(dispatch, e)
    }
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await loginService.login(credentials)
      blogService.setToken(response.data.token)
      window.localStorage.setItem(
        'BlogAppLoggedinUser',
        JSON.stringify(response.data)
      )
      dispatch({
        type: 'LOGIN',
        content: response.data,
      })
      const message = `Successfully logged in user ${response.data.username}`
      handleSuccess(dispatch, message)
    } catch (e) {
      handleError(dispatch, e)
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    try {
      window.localStorage.clear()
      blogService.setToken(null)
      dispatch({
        type: 'LOGOUT',
      })
    } catch (e) {
      handleError(dispatch, e)
    }
  }
}

export default reducer
