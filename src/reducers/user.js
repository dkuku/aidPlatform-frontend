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
      fetch('api/sign_up', {
        method: 'post',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: 'rar@wp.pl',
            password: '1234qwer',
            password_confirmation: '1234qwer',
            first_name: 'aaa1111',
            last_name: 'aaa11111',
          },
        }),
      })
        .then(response => response.json())
        .then(function(data) {
          console.log(data)
          return data.data.user
        })

    case LOGIN:
      console.log(action.payload)
      return action.payload.user
      console.log('login')
    case LOGOUT:
      console.log('logout')
      return {}
    default:
      return state
  }
}
