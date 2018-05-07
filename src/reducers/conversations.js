import { GET_CONVERSATIONS } from 'constants/ActionTypes.js'
const InitialConversations = []

export default function conversations(state = InitialConversations, action) {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return action.payload
    default:
      return state
  }
}
