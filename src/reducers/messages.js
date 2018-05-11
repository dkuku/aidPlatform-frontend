import { GET_MESSAGES, GET_CONVERSATIONS } from 'constants/ActionTypes.js'
const InitialConversations = []

export default function messages(state = InitialConversations, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return action.payload
    default:
      return state
  }
}
