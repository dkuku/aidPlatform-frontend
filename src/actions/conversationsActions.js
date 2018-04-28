import axios from 'axios'
import { GET_CONVERSATIONS } from '../constants/ActionTypes'

export function getConversations(task, headers) {
  return function(dispatch) {
    const url = process.env.REACT_APP_API
    const path = `tasks/${task}/conversations`
    axios
      .get(url + path, headers)
      .then(response => {
        dispatch({
          type: GET_CONVERSATIONS,
          payload: response.data.data,
        })
        console.log('inside GET_CONVERSATIONS')
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: 'GET_CONVERSATIONS_ERROR',
          payload: err,
        })
      })
  }
}