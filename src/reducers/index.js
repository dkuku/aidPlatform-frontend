import { combineReducers } from 'redux'
import counter from './counter'
import markers from './markers'
import filters from './filters'
import user from './user'
import activeIndex from './activeIndex'

const rootReducer = combineReducers({
  counter,
  markers,
  filters,
  user,
  activeIndex,
})
export default rootReducer
