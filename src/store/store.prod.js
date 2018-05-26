import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import { responsiveStoreEnhancer } from 'redux-responsive'
import rootReducer from 'reducers'

const middlewares = [ReduxThunk]
const enhancer = [applyMiddleware(...middlewares), responsiveStoreEnhancer]

export default function configureStore(initialState = {}) {
  return createStore(rootReducer, initialState, compose(...enhancer))
}
