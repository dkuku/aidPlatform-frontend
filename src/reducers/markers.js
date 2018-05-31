import { GET_MARKERS, DELETE_MARKER, UPDATE_MARKER } from 'constants/ActionTypes'

const initialMarkersState = []
const markerDemo = [
]

const markers = (state = markerDemo, action) => {
  switch (action.type) {
    case GET_MARKERS:
      return action.payload
    //    case ADD_MARKER:
    //      return [...state, action.marker]
    case UPDATE_MARKER:
      return state.map(marker => {
        if (marker.id == action.index) {
          return {
            ...marker,
            ...action.payload,
          }
        }
        return marker
      })
    case DELETE_MARKER:
      return state.filter(({ id }) => id !== action.id)
    default:
      return state
  }
}
export default markers
