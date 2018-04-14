import { UPDATE_BOUNDS, UPDATE_CENTER } from 'constants/ActionTypes'

export default function mapCoords(state = {}, action) {
  switch (action.type) {
    case UPDATE_BOUNDS:
      console.log(111, action)
      return {
        ...state,
        bounds: action.payload,
      }
    case UPDATE_CENTER:
      console.log(2111, action)
      return {
        ...state,
        center: action.payload,
      }
    default:
      return state
  }
}
