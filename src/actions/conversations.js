import axios from 'axios'
import { GET_CONVERSATIONS, GET_MESSAGES, SET_MODAL_DATA } from '../constants/ActionTypes'

const url = process.env.REACT_APP_API

export function getConversations(task, headers) {
  console.log(headers)
  return function(dispatch) {
    console.log('task:', task)
    const path = `tasks/${task}`
    axios
      .get(url + path, headers)
      .then(response => {
        console.log(response)
        dispatch({
          type: GET_CONVERSATIONS,
          payload: response.data.data,
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
export function getMessages(headers) {
  return function(dispatch) {
    const path = `messages`
    axios
      .get(url + path, headers)
      .then(response => {
        console.log(response)
        dispatch({
          type: GET_MESSAGES,
          payload: response.data.data,
        })
      })
      .catch(err => {
        console.log(err)
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
          dispatch({
            type: GET_CONVERSATIONS,
            payload: response.data.data,
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
export function sendMessage(id, body, headers) {
  const url = process.env.REACT_APP_API
  const path = `conversations/${id}`
  const bodyForm = { message: { body: body } }
  return function(dispatch) {
    axios
      .post(url + path, bodyForm, headers)
      .then(response => {
        console.log(response.data.data)
        dispatch({
          type: GET_MESSAGES,
          payload: response.data.data,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
