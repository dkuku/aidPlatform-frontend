import { combineReducers } from 'redux'
import counter from './counter'
import markers from './markers'
import filters from './filters'

const rootReducer = combineReducers({
  counter,
  markers,
  filters,
})

export default rootReducer
