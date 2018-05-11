import { LOGIN, SIGNUP, LOGOUT } from 'constants/ActionTypes'

const initialHeader =
  localStorage.getItem('user') === null
    ? {}
    : { headers: { 'AUTH-TOKEN': JSON.parse(localStorage.getItem('user')).authentication_token } }

export default function headers(state = initialHeader, action) {
  switch (action.type) {
    case SIGNUP:
      console.log(action)
      return { headers: { 'AUTH-TOKEN': action.payload.user.authentication_token } }
    case LOGIN:
      console.log('login')
      return { headers: { 'AUTH-TOKEN': action.payload.user.authentication_token } }
      return action.payload.user
    case LOGOUT:
      console.log('logout')
      return {}
    default:
      return state
  }
}
