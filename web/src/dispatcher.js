import { createDispatcher } from 'fluorine-lib'
import thunk from 'fluorine-lib/lib/middleware/thunk'

const opts = {
  logging: {
    stores: false,
    agendas: process.env.NODE_ENV !== 'production'
  }
}

const middlewares = [ thunk ]

const dispatcher = createDispatcher(opts, middlewares)
export default dispatcher

