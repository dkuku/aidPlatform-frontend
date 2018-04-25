import { UPDATE_MARKERS, ADD_MARKER, DELETE_MARKER, EDIT_MARKER } from 'constants/ActionTypes'

const initialMarkersState = []
const markerDemo = [
  {
    id: 1,
    title: 'test marker',
    description: "Couldn'nt download task list from server - please check connection",
    user: '123',
    createdAt: 0,
  },
]

export default function markers(state = markerDemo, action) {
  switch (action.type) {
    case UPDATE_MARKERS:
      return action.payload.markers
    case ADD_MARKER:
      return [...state, action.marker]
    case EDIT_MARKER:
      return state.map(marker => {
        if (marker.id === action.id) {
          return {
            ...marker,
            ...action.updates,
          }
        } else {
          return marker
        }
      })
    case DELETE_MARKER:
      return state.filter(({ id }) => id !== action.id)
    default:
      return state
  }
}
