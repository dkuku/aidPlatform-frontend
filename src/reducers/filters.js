import {} from 'constants/ActionTypes'

const filtersReducerDefaultState = {
  text: 'material',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
}

const filters = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default filters
