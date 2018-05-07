import { UPDATE_STATS } from 'constants/ActionTypes'

const initialState = {
  unfulfiled: 0,
  fulfiled: 0,
  users: 0,
}

export default function stats(state = initialState, action) {
  switch (action.type) {
    case UPDATE_STATS:
      console.log(action)
      return action.payload
    default:
      return state
  }
}
