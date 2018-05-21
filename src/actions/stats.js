import axios from 'axios'
import { UPDATE_STATS } from '../constants/ActionTypes'
import { api as url } from '../constants/variables'

export function getStats() {
  return function(dispatch) {
    const path = 'statistics'
    axios
      .get(url + path)
      .then(response => {
        dispatch({
          type: UPDATE_STATS,
          payload: response.data.data,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function updateStats(stats) {
  return {
    type: UPDATE_STATS,
    payload: stats.stats,
  }
}
