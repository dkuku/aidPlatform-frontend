import axios from 'axios'
import { GET_MARKERS } from '../constants/ActionTypes'

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
