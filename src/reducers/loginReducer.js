import loginService from '../services/login'
import blogService from '../services/blogs'

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
      const loggedinUserData = await loginService.login(credentials)
      if (loggedinUserData) {
        blogService.setToken(loggedinUserData.token)
        window.localStorage.setItem(
          'BlogAppLoggedinUser',
          JSON.stringify(loggedinUserData)
        )
        dispatch({
          type: 'LOGIN',
          content: loggedinUserData,
        })
        console.log('succss')
      }
    } catch (e) {
      console.log(e)
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
