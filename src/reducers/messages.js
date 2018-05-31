import { GET_MESSAGES, GET_MESSAGE, GET_CONVERSATIONS } from 'constants/ActionTypes.js'
const InitialConversations = []

export default function messages(state = InitialConversations, action) {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return action.payload.messages.slice().reverse()
    case GET_MESSAGES:
      return action.payload.messages.slice().reverse()
    case GET_MESSAGE:
      return [...state, action.payload.message]
    default:
      return state
  }
}
