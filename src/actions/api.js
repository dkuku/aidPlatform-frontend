import axios from 'axios'
import { GET_MARKERS, ADD_MARKER, UPDATE_MARKER, USER_MARKERS, SET_MODAL_DATA } from '../constants/ActionTypes'
import { api as url } from '../constants/variables'

export function getMarkers() {
  return function(dispatch) {
    const path = 'tasks'
    axios
      .get(url + path)
      .then(response => {
        dispatch({
          type: GET_MARKERS,
          payload: response.data.data.tasks,
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
export function getUserMarkers(headers) {
  return function(dispatch) {
    const path = 'tasks'
    axios
      .get(url + path, headers)
      .then(response => {
        dispatch({
          type: USER_MARKERS,
          payload: response.data.data.tasks,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
export function getMarkersBounds(bounds) {
  return function(dispatch) {
    const path = 'tasks/within'
    axios
      .post(url + path, { task: bounds })
      .then(response => {
        dispatch({
          type: GET_MARKERS,
          payload: response.data.data.tasks,
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
export function doneTask(id, headers) {
  return function(dispatch) {
    const path = `conversations/${id}`
    console.log(path)
    axios
      .delete(url + path, headers)
      .then(response => {
        console.log(response)
        dispatch({
          type: SET_MODAL_DATA,
          modal: {
            open: true,
            header: `Task marked as done`,
            body: response.data.messages,
            redirect: '/',
          },
        })
      })
      .then(getUserMarkers(headers))
      .catch(err => {
        console.log(err)
      })
  }
}

export function addTask(task, headers) {
  return function(dispatch) {
    const path = 'tasks'
    axios
      .post(url + path, task, headers)
      .then(response => {
        console.log(response)
        dispatch({
          type: ADD_MARKER,
          payload: response.data.data,
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
