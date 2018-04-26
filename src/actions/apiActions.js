import axios from 'axios'
import { GET_MARKERS, ADD_MARKER, GET_CONVERSATION } from '../constants/ActionTypes'

export function getMarkers() {
  return function(dispatch) {
    const url = process.env.REACT_APP_API
    const path = 'tasks'
    axios
      .get(url + path)
      .then(response => {
        dispatch({
          type: 'UPDATE_MARKERS',
          payload: { markers: response.data.data.tasks },
        })
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: 'GET_MARKERS_ERROR',
          payload: err,
        })
      })
  }
}

export function addMarker(form, headers) {
  return function(dispatch) {
    const url = process.env.REACT_APP_API
    const path = 'tasks'
    axios
      .post(url + path, form, headers)
      .then(response => {
        console.log(response)
        dispatch({
          type: 'ADD_MARKER',
          payload: { markers: response.data.data },
        })
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: 'ADD_MARKER_ERROR',
          payload: err,
        })
      })
  }
}

export function getConversations(task) {
  return function(dispatch) {
    const url = process.env.REACT_APP_API
    const path = `tasks/$(task)/conversations`
    axios
      .get(url + path)
      .then(response => {
        console.log(response)
        dispatch({
          type: 'GET_CONVERSATION',
          payload: { conversations: response.data.data },
        })
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: 'GET_CONVERSATION_ERROR',
          payload: err,
        })
      })
  }
}
