import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { AbsoluteFragment as Fragment, Link } from 'redux-little-router'

import './App.css'
import { tasksLoaded, setTask } from '../actions'

const taskQuery = gql`query taskquery { tasks { id, name, state_id, project_id, priority } }`

const mapStateToProps = (state) => {
  return {
    state: state.data,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    tasksLoadedHandler: (data) => dispatch(tasksLoaded(data)),
    onTaskNameFieldChange: (e) => {
      if (e.key === 'Enter') {
        const name = e.currentTarget.value
        dispatch(setTask({ name }))
      }
      console.log(e.key)
    },
    onTaskCheck: (task) => {
      const data = {
        id: task.id,
        state_id: (task.state_id === 0) ? 5 : 0,
      }
      dispatch(setTask(data))
    },
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: [],
      tasks: [],
    }
  }
  render() {
    const { state, onTaskNameFieldChange, onTaskCheck, data } = this.props
    return (
      <div className="App">
        <div className="App-header">
          <h2>project-man 2017</h2>
        </div>
        <div>
          <Link href="/tasks">Tasks</Link>&nbsp;
          <Link href="/projects">Projects</Link>
        </div>
        <Fragment forRoute='/tasks'>
          <input type="text" onKeyDown={onTaskNameFieldChange} />
          {
            (data && data.tasks && data.tasks.length > 0)
              ? (<div>
                <h3>Tasks:</h3>
                <ul>
                  {data.tasks.map(i => (<li>
                    <input
                      type="checkbox"
                      checked={i.state_id === 5}
                      onChange={((j) => () => this.props.onTaskCheck(j))(i)}
                    />
                    {i.name}
                    , state: {i.state_id}
                    , prio: {i.priority}
                  </li>))}
                </ul>
              </div>)
              : (<p>not yet loaded ...</p>)
          }
        </Fragment>
      </div>
    )
  }
}

export default compose(
  graphql(taskQuery),
  connect(mapStateToProps, mapDispatchToProps),
)(App)
