import { LOGIN, SIGNUP, LOGOUT, LOGIN_ERROR, SIGNUP_ERROR, SET_MODAL_DATA } from 'constants/ActionTypes'
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
          dispatch({
            type: SET_MODAL_DATA,
            modal: {
              open: true,
              header: `Welcome ${response.data.data.user.first_name}`,
              body: 'You are now logged in',
              redirect: '/',
            },
          })
        }
      })
      .catch(err => {
        console.log(err.response)
        dispatch({
          type: LOGIN_ERROR,
          payload: err.response.data.messages,
        })
        dispatch({
          type: SET_MODAL_DATA,
          modal: {
            open: true,
            header: `Error`,
            body: err.response.data.messages || err.response.messages,
            redirect: false,
            error: true,
          },
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
            payload: response.data.data.user,
          })
          dispatch({
            type: SET_MODAL_DATA,
            modal: {
              open: true,
              header: `Welcome ${response.data.data.user.first_name}`,
              body: 'Your account has been created.',
              redirect: '/',
            },
          })
        }
      })
      .catch(err => {
        console.log(err.response)
        dispatch({
          type: SIGNUP_ERROR,
          payload: err.response.data.messages,
        })
        dispatch({
          type: SET_MODAL_DATA,
          modal: {
            open: true,
            header: `Error`,
            body: err.response.data.messages || err.response.messages,
            redirect: false,
            error: true,
          },
        })
      })
  }
}

export const logout = createAction(LOGOUT)
