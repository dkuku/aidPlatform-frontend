import { GET_MESSAGES, GET_CONVERSATIONS, UPDATE_MARKER } from 'constants/ActionTypes.js'
const InitialConversations = []

export default function currentTask(state = InitialConversations, action) {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return action.payload.task
    case UPDATE_MARKER:
      return action.payload
    default:
      return state
  }
}
