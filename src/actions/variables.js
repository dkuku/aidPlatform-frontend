import { ACTIVE_INDEX,
  ACTIVE_CATEGORY,
  ACTIVE_CONVERSATION,
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  SIDEBAR_TOGGLE,
  MESSAGE_WINDOW_TOGGLE,
  MESSAGE_WINDOW_OPEN,
  MESSAGE_WINDOW_CLOSE} from 'constants/ActionTypes'

export function updateActiveConversation(activeConversation) {
  return {
    type: ACTIVE_CONVERSATION,
    payload: {id: activeConversation},
  }
}
export function updateActiveCategory(activeCategory) {
  return {
    type: ACTIVE_CATEGORY,
    payload: {id :activeCategory},
  }
}
export function updateActiveIndex(activeIndex) {
  return {
    type: ACTIVE_INDEX,
    activeIndex,
  }  }
export function sidebarClose() {
  return {
    type: SIDEBAR_CLOSE
  }    }
export function sidebarOpen() {
  return {
    type: SIDEBAR_OPEN,
  } }
export function messagesOpen() {
  return {
    type: MESSAGE_WINDOW_OPEN,
  } }
export function messagesClose() {
  return {
    type:MESSAGE_WINDOW_CLOSE,
  } }
export function sidebarToggle() {
  return {
    type: SIDEBAR_TOGGLE,
  } }
export function messagesToggle() {
  return {
    type: MESSAGE_WINDOW_TOGGLE,
  } }
