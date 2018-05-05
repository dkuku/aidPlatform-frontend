import { SAVE_USER_TO_LOCALSTORAGE, LOAD_USER_FROM_LOCALSTORAGE, SET_MODAL_DATA } from 'constants/ActionTypes'
import { createAction } from 'redux-actions'

export function storeUser(user) {
  return (dispatch, user) => {
    localStorage.setItem('user', JSON.stringify(user))
    dispatch({
      type: SET_MODAL_DATA,
      payload: {
        open: true,
        header: 'Hello user.first.name',
        body: 'You have been logged in',
        redirect: '/',
      },
    })
  }
}

export function loadUser() {
  return dispatch => {
    const user = localStorage.getItem('user') === null ? {} : JSON.parse(localStorage.getItem('user'))
    dispatch({
      type: LOAD_USER_FROM_LOCALSTORAGE,
      payload: user,
    })
  }
}
