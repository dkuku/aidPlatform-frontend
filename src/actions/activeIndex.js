import { ACTIVE_INDEX } from 'constants/ActionTypes'
import { createAction } from 'redux-actions'
import activeIndex from '../reducers/activeIndex'

export function updateActiveIndex(activeIndex = 5) {
  return {
    type: 'ACTIVE_INDEX',
    activeIndex,
  }
}
