import { combineReducers } from 'redux'
import { responsiveStateReducer as browser } from 'redux-responsive'
import markers from './markers'
import user from './user'
import position from './position'
import mapCoords from './mapCoords'
import modal from './modal'
import conversations from './conversations'
import stats from './stats'
import headers from './headers'
import messages from './messages'
import currentTask from './currentTask'
import userTasks from './userTasks'
import variables from './variables'

const rootReducer = combineReducers({
  browser,
  markers,
  user,
  position,
  mapCoords,
  modal,
  conversations,
  stats,
  headers,
  messages,
  currentTask,
  userTasks,
  variables,
})

export default rootReducer
