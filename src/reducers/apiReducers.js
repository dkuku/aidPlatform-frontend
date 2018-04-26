import { GET_MARKERS, ADD_MARKER } from 'constants/ActionTypes.js'

export default function(state = null, action) {
  switch (action.type) {
    case GET_MARKERS:
      return action.payload
    case ADD_MARKER:
      console.log(action.payload)
      return action.payload
    default:
      return state
  }
}
