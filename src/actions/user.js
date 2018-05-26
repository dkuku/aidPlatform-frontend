import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  LOGIN_ERROR,
  GENERATE_HEADER,
  SIGNUP_ERROR,
  SET_MODAL_DATA,
} from 'constants/ActionTypes'
import { createAction } from 'redux-actions'
import axios from 'axios/index'
import { api as url } from '../constants/variables'

export function login(form) {
  return function(dispatch) {
    console.log(form)
    axios
      .post(`${url}sign_in`, form)
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
              redirect: ()=> window.location.replace("/")
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
            payload: response.data.data,
          })
          dispatch({
            type: SET_MODAL_DATA,
            modal: {
              open: true,
              header: `Welcome ${response.data.data.user.first_name}`,
              body: 'Your account has been created.',
              redirect: ()=> window.location.replace("/")
            },
          })
        }
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: SIGNUP_ERROR,
          payload: err.response.messages,
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
export function updatePicture(file, headers) {
  const form = new FormData()
  form.append('user[picture]', file)
  console.log(headers)
  return function(dispatch) {
    axios
      .put(`${url}user`, form, headers)
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          console.log(response)
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
              body: 'Your ID was added to the database',
              redirect: '',
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
export const logout = createAction(LOGOUT)
