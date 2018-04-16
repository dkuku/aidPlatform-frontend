import { SET_FILTER_TYPE, SET_FILTER_DATE } from 'constants/ActionTypes'
const currentDate = new Date()
const days = 24 * 60 * 60 * 1000
const filtersReducerDefaultState = {
  type: 'material',
  sortBy: 'date',
  endDate: new Date(),
  startDate: new Date(Date.now() - 7 * days),
}

function filters(state = filtersReducerDefaultState, action) {
  switch (action.type) {
    case SET_FILTER_TYPE:
      console.log(action.payload)
      return {
        ...state,
        type: action.payload,
      }
    case SET_FILTER_DATE:
      console.log(action.payload)
      return {
        ...state,
        startDate: new Date(Date.now() - Number(action.payload) * days),
      }
    default:
      return state
  }
}

export default filters
