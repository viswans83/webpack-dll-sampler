let React = require('react')
let PropTypes = require('prop-types')

let Counter = function(props) {
  return (
    <div style={{ border: '1px ' + props.color + ' solid', width: '100px', height: '100px' }}>
      <h5>{ props.heading }</h5>
      <div>Value: { props.value }</div>
      <div>
        <button onClick={props.increment}>+</button>
        <button onClick={props.decrement}>-</button>
      </div>
      <div>
        <a href={props.link}>Goto {props.link}</a>
      </div>
    </div>
  )
}

Counter.PropTypes = {
  color: PropTypes.string,
  heading: PropTypes.string,
  increment: PropTypes.fn,
  decrement: PropTypes.fn,
  link: PropTypes.string
}

module.exports.Counter = Counter
