import { USER_MARKERS } from 'constants/ActionTypes'

const initialTaskState = {
  unfulfiled: [],
  fulfiled: [],
  active: [],
  closed: [],
}

const userTasks = (state = initialTaskState, action) => {
  switch (action.type) {
    case USER_MARKERS:
      return action.payload
    default:
      return state
  }
}
export default userTasks
