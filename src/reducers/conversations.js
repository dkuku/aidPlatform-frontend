import { GET_MESSAGES, GET_CONVERSATIONS, ADD_CONVERSATION } from 'constants/ActionTypes.js'
const InitialConversations = []

export default function conversations(state = InitialConversations, action) {
  switch (action.type) {
    case ADD_CONVERSATION:
      return [action.payload]
    case GET_CONVERSATIONS:
      return action.payload.conversation
    default:
      return state
  }
}
