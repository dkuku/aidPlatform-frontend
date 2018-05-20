import { combineReducers } from 'redux'
import { responsiveStateReducer as browser } from 'redux-responsive'
import markers from './markers'
import filters from './filters'
import user from './user'
import activeIndex from './activeIndex'
import position from './position'
import mapCoords from './mapCoords'
import modal from './modal'
import conversations from './conversations'
import stats from './stats'
import headers from './headers'
import messages from './messages'
import currentTask from './currentTask'

const rootReducer = combineReducers({
  browser,
  markers,
  filters,
  user,
  activeIndex,
  position,
  mapCoords,
  modal,
  conversations,
  stats,
  headers,
  messages,
  currentTask,
})

export default rootReducer
