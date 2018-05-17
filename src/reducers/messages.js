import { GET_MESSAGES, GET_CONVERSATIONS } from 'constants/ActionTypes.js'
const InitialConversations = []

export default function messages(state = InitialConversations, action) {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return [...state, ...action.payload.messages]
    case GET_MESSAGES:
      return [...state, ...action.payload.messages]
    default:
      return state
  }
}
