import usersService from '../services/users'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return action.content
    default:
      return state
  }
}

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const users = await usersService.getAll()
      if (users) {
        dispatch({
          type: 'GET_USERS',
          content: users,
        })
        console.log('succss')
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export default reducer
