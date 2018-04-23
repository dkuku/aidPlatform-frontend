import { UPDATE_BOUNDS, UPDATE_CENTER } from 'constants/ActionTypes'

export default function mapCoords(state = {}, action) {
  switch (action.type) {
    case UPDATE_BOUNDS:
      return {
        ...state,
        bounds: action.payload,
      }
    case UPDATE_CENTER:
      return {
        ...state,
        center: action.payload,
      }
    default:
      return state
  }
}
