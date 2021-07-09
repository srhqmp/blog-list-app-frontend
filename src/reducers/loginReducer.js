import loginService from '../services/login'
import blogService from '../services/blogs'

import { setNotification } from './notificationReducer'

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
    const user = JSON.parse(window.localStorage.getItem('BlogAppLoggedinUser'))
    if (user) {
      blogService.setToken(user.token)
      dispatch({
        type: 'CHECK_LOGIN',
        content: user,
      })
    }
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await loginService.login(credentials)
      if (response.status === 200) {
        if (response.data) {
          console.log(response.data)
          blogService.setToken(response.data.token)
          window.localStorage.setItem(
            'BlogAppLoggedinUser',
            JSON.stringify(response.data)
          )
          dispatch({
            type: 'LOGIN',
            content: response.data,
          })
          dispatch(
            setNotification(
              {
                message: `Successfully logged in user ${response.data.username}`,
                classification: 'success',
              },
              5
            )
          )
        }
      } else {
        dispatch(
          setNotification(
            { message: response.data.error, classification: 'error' },
            5
          )
        )
      }
    } catch (e) {
      dispatch(
        setNotification({ message: e.response, classification: 'error' }, 5)
      )
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    blogService.setToken(null)
    dispatch({
      type: 'LOGOUT',
    })
  }
}

export default reducer
