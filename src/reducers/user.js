import { LOGIN, SIGNUP, LOGOUT, USER_MARKERS } from 'constants/ActionTypes'

const initialUserState = localStorage.getItem('user') === null ? {} : JSON.parse(localStorage.getItem('user'))

export default function user(state = initialUserState, action) {
  switch (action.type) {
    case SIGNUP:
      return action.payload.user
    case LOGIN:
      return action.payload.user
    case LOGOUT:
      localStorage.removeItem('user')
      return {}
    default:
      return state
  }
}
