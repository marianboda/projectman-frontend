import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import './App.css'
import { tasksLoaded, setTask } from './actions'

const taskQuery = gql`query taskquery { tasks { id, name, state_id, project_id, priority } }`

const mapStateToProps = (state) => {
  console.log('logging props', state)
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
      // console.log()
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
  componentDidMount() {
    // const data =
    // fetch(
    //   'http://localhost:3000/graphql',
    //   {
    //     method: 'POST',
    //     body: '{"query": "{ tasks { id, name, state_id, project_id, priority } }"}',
    //     headers: new Headers({ 'Content-Type': 'application/json' }),
    //   },
    // ).then(i => i.json())
    // .then(i => this.props.tasksLoadedHandler({ tasks: i.data.tasks }))
  }
  render() {
    const { state, onTaskNameFieldChange, onTaskCheck, data } = this.props
    console.log('appProps', this.props)
    console.log('rerender', state)
    const self = this

console.log(self.setTask)

    return (
      <div className="App">
        <div className="App-header">
          <h2>project-man 2017</h2>
        </div>
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
      </div>
    )
  }
}
// const select = ['id', 'name', 'state_id'].join(', ')
// const vals = Object.keys(rec).map(i => `${i}: ${quoteVal(rec[i])}`).join(', ')

// const setTaskMutation = gql`mutation { setTask(task: {id: 1, name: "${new Date().getSeconds()}"}) { id, name, state_id } }`

export default compose(
  graphql(taskQuery),
  // graphql(setTaskMutation, {name: 'setTask'}),
  connect(mapStateToProps, mapDispatchToProps),
)(App)
