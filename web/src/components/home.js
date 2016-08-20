import React, { Component } from 'react'
import { connectStore, connectActions } from 'fluorine-lib'
import look, { StyleSheet } from 'react-look'

import {
  fetchSentences
} from '../actions/sentence'

const Colors = {
  blue: '#4f7cf7',
  lightBlue: '#6C96FE',
  middleGrey: 'rgba(21, 23, 36, 0.2)',
  grey: 'rgba(21, 23, 36, 0.7)'
}

const styles = StyleSheet.create({
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  header: {
    marginTop: -100,
    marginBottom: 40,
    color: '#3B3B4E'
  },
  first: {
    width: 400,
    margin: '0px auto',
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    padding: 10,
    fontSize: 13,
    lineHeight: '24px',
    borderRadius: 5,
    outline: 'none',
    border: `1px solid ${Colors.middleGrey}`,
    color: Colors.grey
  },
  button: {
    marginTop: 20,
    padding: '10px 0px',
    fontSize: 13,
    lineHeight: '24px',
    backgroundColor: Colors.blue,
    color: 'white',
    outline: 'none',
    cursor: 'pointer',
    borderRadius: 5,
    border: 'none',
    ':hover': {
      backgroundColor: Colors.lightBlue
    }
  },
  second: {

  }
})

@connectActions({
  fetchSentences
})
@connectStore(store => store
  .pluck('sentences')
  .distinctUntilChanged(),
'sentences')

class Home extends Component {

  state = {
    query: ''
  };

  onChange = evt => {
    this.setState({
      query: evt.target.value
    })
  };

  onStart = () => {
    const { query } = this.state
    this.props.actions.fetchSentences(query)
  };

  render() {
    const { actions, sentences } = this.props

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Moody Kah !</h1>
        </div>
        <div className={styles.first}>
          <input
            className={styles.input}
            onChange={this.onChange}
            type='text'
            placeholder='Enter a sentence'/>
          <button
            className={styles.button}
            onClick={this.onStart}>Convert</button>
        </div>
        <div className={styles.second}>
        </div>
      </div>
    )
  }
}

export default look(Home)
