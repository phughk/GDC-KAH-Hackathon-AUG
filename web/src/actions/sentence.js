import { Observable } from '@reactivex/rxjs'
import { get } from '../request'
import {
  ADD_SENTENCE,
  REMOVE_SENTENCE,
  CLEAR_SENTENCE
} from '../constants/sentence'

const add = countries => (
  Observable.of({
    payload: countries,
    type: ADD_SENTENCE
  })
)

export function fetchSentences(sentence) {
  return (next, reduce) =>
    get('', { sentence })
      .flatMap(add)
}
