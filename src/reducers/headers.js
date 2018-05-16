import { LOGIN, SIGNUP, LOGOUT } from 'constants/ActionTypes'

const initialHeader =
  localStorage.getItem('user') === null
    ? {}
    : { headers: { 'AUTH-TOKEN': JSON.parse(localStorage.getItem('user')).authentication_token } }

const headers = (state = initialHeader, action) => {
  switch (action.type) {
    case SIGNUP:
      console.log(action)
      return { headers: { 'AUTH-TOKEN': action.payload.user.authentication_token } }
    case LOGIN:
      console.log('login')
      return { headers: { 'AUTH-TOKEN': action.payload.user.authentication_token } }
    default:
      return state
  }
}

export default headers
