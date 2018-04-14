import { combineReducers } from 'redux'
import counter from './counter'
import markers from './markers'
import filters from './filters'
import user from './user'
import activeIndex from './activeIndex'
import position from './position'
import mapCoords from './mapCoords'

const rootReducer = combineReducers({
  counter,
  markers,
  filters,
  user,
  activeIndex,
  position,
  mapCoords,
})
export default rootReducer
