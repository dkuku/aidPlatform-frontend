import axios from 'axios'
import {
  ACTIVE_CONVERSATION,
  GET_CONVERSATIONS,
  GET_MESSAGE,
  ADD_CONVERSATION,
  GET_MESSAGES,
  SET_MODAL_DATA,
} from '../constants/ActionTypes'
import { api as url } from '../constants/variables'

export function getConversations(task, headers) {
  return function(dispatch) {
    const path = `tasks/${task}`
    axios
      .get(url + path, headers)
      .then(response => {
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
  const form = { conversation: { task_id: taskId } }
  return function(dispatch) {
    axios
      .post(`${url}conversations`, form, headers)
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          dispatch({
            type: ADD_CONVERSATION,
            payload: response.data.data.conversation[0],
          })
          dispatch({
            type: ACTIVE_CONVERSATION,
            payload: response.data.data.conversation[0].id,
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
export function sendMessage(id, body, headers) {
  const path = `conversations/${id}`
  const bodyForm = { message: { body: body } }
  return function(dispatch) {
    axios
      .post(url + path, bodyForm, headers)
      .then(response => {})
      .catch(err => {
        console.log(err)
      })
  }
}

export function addMessage(message) {
  return function(dispatch) {
    dispatch({
      type: GET_MESSAGE,
      payload: message,
    })
  }
}
