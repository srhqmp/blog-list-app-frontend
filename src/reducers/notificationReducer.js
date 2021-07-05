const initialState = {
  message: null,
  classification: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.content
  case 'CLEAR_NOTIFICATION':
    return initialState
  default:
    return state
  }
}

let timeoutId

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      content,
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, time * 1000)
  }
}

// eslint-disable-next-line no-unused-vars
export const clearNotification = (id) => ({ type: 'CLEAR_NOTIFICATION' })

export default reducer
