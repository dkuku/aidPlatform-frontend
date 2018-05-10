import axios from 'axios'
import { GET_MARKERS, ADD_MARKER, GET_CONVERSATION, SET_MODAL_DATA } from '../constants/ActionTypes'

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

export function addTask(task, headers) {
  return function(dispatch) {
    const url = process.env.REACT_APP_API
    const path = 'tasks'
    axios
      .post(url + path, task, headers)
      .then(response => {
        console.log(response)
        dispatch({
          type: 'ADD_MARKER',
          payload: { markers: response.data.data },
        })
        dispatch({
          type: SET_MODAL_DATA,
          modal: {
            open: true,
            header: `All OK`,
            body: response.data.messages,
            redirect: '/',
          },
        })
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: SET_MODAL_DATA,
          modal: {
            open: true,
            header: `Error`,
            body: err.response.data.messages || err.response.messages,
            redirect: false,
            error: true,
          },
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
