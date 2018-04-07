import { LOGIN, SIGNUP, LOGOUT } from 'constants/ActionTypes'

const initialUserState = {}

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
      return {}
    default:
      return state
  }
}
