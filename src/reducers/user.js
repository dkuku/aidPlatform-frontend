import { LOGIN, SIGNUP, LOGOUT, USER_MARKERS } from 'constants/ActionTypes'

const initialUserState = localStorage.getItem('user') === null ? {} : JSON.parse(localStorage.getItem('user'))

export default function user(state = initialUserState, action) {
  switch (action.type) {
    case SIGNUP:
      console.log(action)
      return action.payload.user
    case LOGIN:
      console.log('login')
      return action.payload.user
    case LOGOUT:
      console.log('logout')
      localStorage.removeItem('user')
      return {}
    default:
      return state
  }
}
