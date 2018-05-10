import { GET_MESSAGES, GET_CONVERSATIONS } from 'constants/ActionTypes.js'
const InitialConversations = []

export default function conversations(state = InitialConversations, action) {
  console.log(action)
  switch (action.type) {
    case GET_CONVERSATIONS:
      return action.payload
    case GET_MESSAGES:
      return action.payload
    default:
      return state
  }
}
