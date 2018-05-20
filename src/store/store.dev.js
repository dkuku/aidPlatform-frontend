import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { responsiveStoreEnhancer } from 'redux-responsive'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from 'reducers'

export default function configureStore(initialState = {}) {
  const middlewares = [ReduxThunk]
  const enhancers = [
    applyMiddleware(...middlewares),
    responsiveStoreEnhancer,
    // other store enhancers if any
  ]
  const composeEnhancers = composeWithDevTools({
    // other compose enhancers if any
    // Specify here other options if needed
  })

  const store = createStore(rootReducer, initialState, composeEnhancers(...enhancers))

  store.subscribe(() => {
    console.log(store.getState())
  })

  // store.dispatch(addMarker({description: "test marker", title: "first.test.marker", lat: "51.5", lng: '0.2'}))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      /* eslint-disable global-require */
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
