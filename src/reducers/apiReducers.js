import { GET_MARKERS } from 'constants/ActionTypes.js'

export default function(state = null, action) {
  switch (action.type) {
    case GET_MARKERS:
      return action.payload
    default:
      return state
  }
}
