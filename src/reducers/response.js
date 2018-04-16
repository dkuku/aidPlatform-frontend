import { SET_TASK_FILTER } from 'constants/ActionTypes'
const initialState = () => true
export default function taskFilter(state = initialState, action) {
  console.log(action, state)
  switch (action.type) {
    case SET_TASK_FILTER:
      return {
        ...state,
        taskFilter: action.payload.taskFilter,
      }
    default:
      return state
  }
}
