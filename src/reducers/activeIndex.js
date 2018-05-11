import { ACTIVE_INDEX } from 'constants/ActionTypes'

const initialActive = 1

export default function activeIndex(state = initialActive, action) {
  switch (action.type) {
    case ACTIVE_INDEX:
      return action.activeIndex
    default:
      return state
  }
}
