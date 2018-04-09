import { LOGIN, SIGNUP, LOGOUT } from 'constants/ActionTypes'

const initialUserState = {
  id: 1,
  authentication_token: 'ut7AiccGMPTPdu2pGYza',
  email: 'dan@wp.pl',
  first_name: 'daniel',
  last_name: 'kukula',
  created_at: '2018-03-24T22:48:13.568Z',
  updated_at: '2018-04-07T04:10:41.386Z',
}

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
