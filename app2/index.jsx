import * as React from 'react'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

let App = function(props) {
  return (
    <div style={{ border: '1px red solid', width: '200px', height: '200px' }}>
      <h5>App Two</h5>
      <div>Value: { props.value }</div>
      <div>
        <button onClick={props.increment}>+</button>
        <button onClick={props.decrement}>-</button>
      </div>
      <div>
        <a href="/app1">Visit App 1</a>
      </div>
    </div>
  )
}

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
)(App)

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
    <AppConnected />
  </Provider>
  , document.getElementById('root')
)
