import { MODAL_OPEN, MODAL_CLOSE, SET_MODAL_DATA } from 'constants/ActionTypes'

export const openModal = () => ({
  type: MODAL_OPEN,
})
export const closeModal = () => ({
  type: MODAL_CLOSE,
})
export const setModal = modal => ({
  type: SET_MODAL_DATA,
  modal,
})
