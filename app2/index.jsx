import * as React from 'react'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

import { Counter } from '../shared'

let AppConnected = connect(
  function(number) {
    return {
      value: number
    }
  },
  function(dispatch) {
    return {
      increment: () => dispatch({ type: 'INC' }),
      decrement: () => dispatch({ type: 'DEC' })
    }
  }
)(Counter)

let reducer = function(state = 0, action) {
  switch(action.type) {
    case 'INC': return state + 10
    case 'DEC': return state - 10
    default: return state
  }
}

let logger = createLogger()

let store = createStore(reducer, applyMiddleware(logger))

render(
  <Provider store={store}>
    <AppConnected color="red" heading="App Two" link="/app1" />
  </Provider>
  , document.getElementById('root')
)
