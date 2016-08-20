import {
  ADD_SENTENCE,
  REMOVE_SENTENCE,
  CLEAR_SENTENCE
} from '../constants/sentence'

const initial = {}

export default function sentences(state = initial, action) {
  const { payload, type } = action

  switch (type) {
    case ADD_SENTENCE: {
      let res
      if (Array.isArray(payload)) {
        res = payload.reduce((acc, next) => {
          acc[next.id] = next
          return acc
        }, {})
      } else {
        res = { [payload.id]: payload }
      }

      return Object.assign({}, state, res)
    }

    case REMOVE_SENTENCE: {
      delete state[payload]
      return state
    }

    case CLEAR_SENTENCE: {
      return initial
    }

    default:
      return state
  }
}

