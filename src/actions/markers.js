import { UPDATE_MARKERS, ADD_MARKER, DELETE_MARKER, EDIT_MARKER } from 'constants/ActionTypes'
import { createAction } from 'redux-actions'

export const updateMarkers = markers => ({
  type: 'UPDATE_MARKERS',
  markers,
})

export const addMarker = ({ title = '', description = '', latitude = 0, longitude = 0 } = {}) => ({
  type: 'ADD_MARKER',
  marker: {
    title,
    description,
    latitude,
    longitude,
  },
})

export const deleteMarker = ({ id }) => ({
  type: 'DELETE_MARKER',
  id,
})

export const editMarker = (id, updates) => ({
  type: 'EDIT_MARKER',
  id,
  updates,
})
