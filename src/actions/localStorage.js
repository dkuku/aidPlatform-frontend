import { SAVE_USER_TO_LOCALSTORAGE, LOAD_USER_FROM_LOCALSTORAGE } from 'constants/ActionTypes'
import { createAction } from 'redux-actions'
function dispatch() {}
export function storeUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
  dispatch({
    type: SAVE_USER_TO_LOCALSTORAGE,
    payload: user,
  })
}

export function loadUser() {
  const user = localStorage.getItem('user') === null ? {} : JSON.parse(localStorage.getItem('user'))
  dispatch({
    type: LOAD_USER_FROM_LOCALSTORAGE,
    payload: user,
  })
}
