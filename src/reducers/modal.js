import { MODAL_OPEN, MODAL_CLOSE, SET_MODAL_DATA } from 'constants/ActionTypes'

const initialState = {
  open: false,
  header: 'TEST',
  body: 'initial state',
  redirect: '/',
}
export default function modal(state = initialState, action) {
  switch (action.type) {
    case MODAL_OPEN:
      return {
        ...state,
        open: true,
      }
    case MODAL_CLOSE:
      return {
        ...state,
        open: false,
      }
    case SET_MODAL_DATA:
      return {
        ...state,
        ...action.modal,
      }
    default:
      return state
  }
}
