import React, { Component } from 'react'
import { LookRoot, Presets } from 'react-look'

import { Provider, combineReducers } from 'fluorine-lib'
import {
  IndexRoute,
  Route,
  Router,
  browserHistory
} from 'react-router'

import dispatcher from './dispatcher'
import reducers from './reducers/index'
import Root from './containers/root'
import Home from './components/home'

export default class App extends Component {
  render() {
    return (
      <Provider
        dispatcher={dispatcher}
        observable={({ reduce }) => combineReducers(reducers)(reduce)}>
        <LookRoot config={Presets['react-dom']}>
          <Router history={browserHistory}>
            <Route path='/' component={Root}>
              <IndexRoute component={Home}/>
            </Route>
          </Router>
        </LookRoot>
      </Provider>
    )
  }
}

