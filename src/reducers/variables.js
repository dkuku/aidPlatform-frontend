import { ACTIVE_MARKER } from 'constants/ActionTypes'

const initialActive = 3

export default function activeMarker(state = initialActive, action) {
  switch (action.type) {
    case ACTIVE_MARKER:
      if (action.payload && action.payload.active) {
        return
        action.payload.active
      }
      return null
    default:
      return state
  }
}
