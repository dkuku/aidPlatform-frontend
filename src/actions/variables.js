import { ACTIVE_MARKER } from 'constants/ActionTypes'
import { createAction } from 'redux-actions'

export function activeMarker(id = null) {
  return {
    type: 'ACTIVE_MARKER',
    id,
  }
}
