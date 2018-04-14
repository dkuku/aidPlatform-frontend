import { UPDATE_BOUNDS, UPDATE_CENTER } from 'constants/ActionTypes'
import { createAction } from 'redux-actions'

export const updateBounds = createAction(UPDATE_BOUNDS)

export const updateCenter = createAction(UPDATE_CENTER)
