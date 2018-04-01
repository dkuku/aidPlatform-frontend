import { combineReducers } from 'redux'
import counter from './counter'
import markers from './markers'
import filters from './filters'
import user from './user'

const rootReducer = combineReducers({
  counter,
  markers,
  filters,
  user,
})

export default rootReducer
