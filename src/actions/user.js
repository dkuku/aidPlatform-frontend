import { LOGIN, SIGNUP, LOGOUT, LOGIN_ERROR, SIGNUP_ERROR } from 'constants/ActionTypes'
import { createAction, dispatch } from 'redux-actions'
import axios from 'axios/index'

const url = process.env.REACT_APP_API

export function login(body) {
  return function(dispatch) {
    axios
      .post(`${url}sign_in`, body)
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          console.log(response.data.data.user)
          localStorage.setItem('user', JSON.stringify(response.data.data.user))

          dispatch({
            type: LOGIN,
            payload: response.data.data,
          })
        }
      })
      .catch(error => {
        console.log(error.response)
        dispatch({
          type: LOGIN_ERROR,
          payload: error.response.data.messages,
        })
      })
  }
}

export function signup(body) {
  return function(dispatch) {
    axios
      .post(`${url}sign_up`, body)
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          localStorage.setItem('user', JSON.stringify(response.data.data.user))
          dispatch({
            type: SIGNUP,
            payload: response.data.data,
          })
        }
      })
      .catch(error => {
        console.log(error.response)
        dispatch({
          type: SIGNUP_ERROR,
          payload: error.response.data.messages,
        })
      })
  }
}

export const logout = createAction(LOGOUT)
