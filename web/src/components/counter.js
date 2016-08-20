import React, { Component } from 'react'
import { connectStore, connectActions } from 'fluorine-lib'

import {
  increment,
  decrement,
  incrementDelayedAgenda,
  incrementIfOdd,
  incrementDelayedRollback
} from '../actions/counter'

@connectActions({
  increment,
  decrement,
  incrementDelayedAgenda,
  incrementIfOdd,
  incrementDelayedRollback
})
@connectStore(store => store
  .pluck('counter')
  .distinctUntilChanged(),
'counter')

export default class Counter extends Component {
  render() {
    const { actions, counter } = this.props

    return (
      <div>
        <p style={{ margin: 10 }}>
          Clicked {counter} times.
        </p>

        <div>
          <button onClick={actions.increment}>
            +
          </button>

          <button onClick={actions.decrement}>
            -
          </button>

          <br/>

          <button onClick={() => actions.incrementDelayedAgenda(1000)}>
            Delayed Increment
          </button>

          <button onClick={actions.incrementIfOdd}>
            Increment if odd
          </button>

          <button onClick={actions.incrementDelayedRollback}>
            Increment async and rollback
          </button>

        </div>
      </div>
    )
  }
}
