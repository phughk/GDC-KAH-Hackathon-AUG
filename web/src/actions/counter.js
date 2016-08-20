import { Observable } from '@reactivex/rxjs'

import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../constants/counter'
import counter from '../reducers/counter'

export function increment() {
  return Observable.of({
    type: INCREMENT_COUNTER
  })
}

export function decrement() {
  return Observable.of({
    type: DECREMENT_COUNTER
  })
}

export function incrementDelayedAgenda(delay = 1000) {
  return increment()
    .delay(1000)
}

export function incrementIfOdd() {
  return (_, reduce) => reduce(counter)
    .first()
    .flatMap(val => {
      if (val % 2 !== 0) {
        return increment()
      }

      return Observable.empty()
    })
}

export function incrementDelayedRollback() {
  return incrementDelayedAgenda()
    .concat(Observable.throw('Hello World!'))
}

