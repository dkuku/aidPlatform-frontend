import { SET_FILTER_TYPE, SET_FILTER_DATE } from 'constants/ActionTypes'
import { createAction } from 'redux-actions'

export const setFilterType = createAction(SET_FILTER_TYPE)
export const setFilterDate = createAction(SET_FILTER_DATE)
