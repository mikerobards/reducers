import React, { useState, useReducer } from 'react';
import ReactDOM from 'react-dom';

function useCounter() {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'INCREMENT': {
        return { ...state, count: state.count + 1 }
      }
      case 'DECREMENT': {
        return { ...state, count: state.count - 1 }
      }
      default: {
        return state
      }
    }
  }, {
    count: 0
  })

  return [state, dispatch]
}

const App = () => {
  // const [count, setCount] = useState(0)
  const [state, dispatch] = useCounter()

  let { count } = state

  const add = () => {
    // setCount(count + 1)
    dispatch({ type: 'INCREMENT' })
  }

  const subtract = () => {
    if (count > 0) {
      // setCount(count - 1)
      dispatch({ type: 'DECREMENT' })
    }
  }

  return (
    <section>
      <h2>Counter: The Most Novel Example I Could Come Up With</h2>
      <div className="counter">
        <button onClick={subtract}>-</button>
        <div>{count}</div>
        <button onClick={add}>+</button>
      </div>
    </section>
  )
}

let initialState = { count: 0, cake: true }

let actions = [
  { type: 'ADD', by: 2 },
  { type: 'MINUS', by: 4 },
  { type: 'ADD', by: 10 },
  { type: 'EAT_CAKE' }
]

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      return { ...state, count: state.count + action.by }
    }
    case 'MINUS': {
      return { ...state, count: state.count - action.by }
    }
    case 'EAT_CAKE': {
      return { ...state, cake: false }
    }
    default: {
      return state
    }
  }
}

console.log(actions.reduce(reducer, initialState))

export default App