import { LOGIN, SIGNUP, LOGOUT } from 'constants/ActionTypes'

const initialUserState = {}
const userDemo = {
  id: 1,
  user: 'Daniel',
  email: '123@qq.pl',
  token: 'FEpty_j9SDtozes4JWmg',
}

export default function user(state = initialUserState, action) {
  switch (action.type) {
    case SIGNUP:
      console.log('signup')
      return userDemo
    case LOGIN:
      console.log('login')
      return userDemo
    case LOGOUT:
      console.log('logout')
      return {}
    default:
      return state
  }
}
