import { combineReducers } from 'redux'
import markers from './markers'
import filters from './filters'
import user from './user'
import activeIndex from './activeIndex'
import position from './position'
import mapCoords from './mapCoords'
import apiReducers from './apiReducers'
import modalReducers from './modalReducers'
import conversationsReducers from './conversationsReducers'

const rootReducer = combineReducers({
  markers,
  filters,
  user,
  activeIndex,
  position,
  mapCoords,
  apiReducers,
  modalReducers,
  conversationsReducers,
})
export default rootReducer
