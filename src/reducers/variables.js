import { ACTIVE_INDEX, ACTIVE_CATEGORY, ACTIVE_CONVERSATION,
  SIDEBAR_TOGGLE,
  MESSAGE_WINDOW_TOGGLE,
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  MESSAGE_WINDOW_OPEN,
  MESSAGE_WINDOW_CLOSE} from 'constants/ActionTypes'

const initial =  {
  activeIndex: 1,
  activeConversation: null,
  activeCategory: 'unfulfiled',
  sidebar: false,
  messageWindow: false
}

export default function variables(state = initial, action) {
  switch (action.type) {
    case ACTIVE_CONVERSATION:
      console.log(action)
      return {...state, activeConversation: action.payload.id}
    case ACTIVE_CATEGORY:
      return {...state, activeCategory: action.payload.id}
    case ACTIVE_INDEX:
      return {...state, activeIndex: action.payload.id}
    case SIDEBAR_OPEN:
      return {...state, sidebar: true}
    case SIDEBAR_TOGGLE:
      return {...state, sidebar: !state.sidebar}
    case SIDEBAR_CLOSE:
      return {...state, sidebar: false}
    case MESSAGE_WINDOW_OPEN:
      return {...state, messageWindow: true}
    case MESSAGE_WINDOW_CLOSE:
      return {...state, messageWindow: false}
    case MESSAGE_WINDOW_TOGGLE:
      return {...state, messageWindow: !state.messageWindow}

    default:
      return state
  }
}
