import { combineReducers } from 'redux'
import markers from './markers'
import filters from './filters'
import user from './user'
import activeIndex from './activeIndex'
import position from './position'
import mapCoords from './mapCoords'
import apiReducers from './apiReducers'
import modal from './modal'
import conversations from './conversations'
import stats from './stats'

const rootReducer = combineReducers({
  markers,
  filters,
  user,
  activeIndex,
  position,
  mapCoords,
  apiReducers,
  modal,
  conversations,
  stats,
})
export default rootReducer
