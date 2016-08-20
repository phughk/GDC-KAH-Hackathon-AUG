import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import {
  Route,
  IndexRoute,
  Router,
  browserHistory
} from 'react-router'

import './reset.css'
import App from './app'

function entry() {
  const root = document.getElementById('root')

  render((
    <AppContainer>
      <App/>
    </AppContainer>
  ), root)
}

entry()

if (module.hot) {
  module.hot.accept('./app', () => {
    // NOTE: Circumvent webpack only considering modules accepted after a require
    const NewApp = require('./app')

    entry()
  })
}

