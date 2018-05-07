import { ACTIVE_INDEX } from 'constants/ActionTypes'

const initialActive = 3

export default function activeIndex(state = initialActive, action) {
  switch (action.type) {
    case ACTIVE_INDEX:
      return action.activeIndex
    default:
      return state
  }
}
