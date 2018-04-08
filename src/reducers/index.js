import { combineReducers } from 'redux'
import counter from './counter'
import markers from './markers'
import filters from './filters'
import user from './user'
import activeMarker from './variables'
const rootReducer = combineReducers({
  counter,
  markers,
  filters,
  user,
  activeMarker,
})
export default rootReducer
