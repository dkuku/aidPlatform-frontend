import { GET_MESSAGES, GET_CONVERSATIONS } from 'constants/ActionTypes.js'
const InitialConversations = []

export default function currentTask(state = InitialConversations, action) {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return action.payload.task
    default:
      return state
  }
}
