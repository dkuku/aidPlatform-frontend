import axios from 'axios'
import { GET_CONVERSATIONS, SET_MODAL_DATA } from '../constants/ActionTypes'

const url = process.env.REACT_APP_API

export function getConversations(task, headers) {
  return function(dispatch) {
    const path = `tasks/${task}`
    axios
      .get(url + path, headers)
      .then(response => {
        dispatch({
          type: GET_CONVERSATIONS,
          payload: response.data.data.conversations,
        })
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
export function createConversation(taskId, headers) {
  console.log('taskID: ', taskId)
  const form = { conversation: { task_id: taskId } }
  return function(dispatch) {
    axios
      .post(`${url}conversations`, form, headers)
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          console.log(response.data.data)
          dispatch({
            type: GET_CONVERSATIONS,
            payload: response.data.data.conversations,
          })
          dispatch({
            type: SET_MODAL_DATA,
            modal: {
              open: true,
              header: `Request submitted`,
              body: 'You can now reply to the request',
              redirect: false,
            },
          })
        }
      })
      .catch(err => {
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
