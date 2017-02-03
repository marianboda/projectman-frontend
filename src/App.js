import React, { Component } from 'react'
import { connect } from 'react-redux'

import './App.css'
import { tasksLoaded, setTask } from './actions'

const mapStateToProps = (state) => {
  console.log('logging props', state)
  return { state }
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
        state_id: 5,
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
    fetch(
      'http://localhost:3000/graphql',
      {
        method: 'POST',
        body: '{"query": "{ tasks { id, name, state_id } }"}',
        headers: new Headers({ 'Content-Type': 'application/json' }),
      },
    ).then(i => i.json())
    .then(i => this.props.tasksLoadedHandler({ tasks: i.data.tasks }))
  }
  render() {
    const { state, onTaskNameFieldChange, onTaskCheck } = this.props
    console.log('rerender', state)
    return (
      <div className="App">
        <div className="App-header">
          <h2>project-man 2017</h2>
        </div>
        <input type="text" onKeyDown={onTaskNameFieldChange} />
        {
          (state.tasks.length > 0)
            ? (<div>
              <h3>Tasks:</h3>
              <ul>
                {state.tasks.map(i => (<li>
                  <input
                    type="checkbox"
                    checked={i.state_id == 5}
                    onChange={((j) => e => onTaskCheck(j))(i)}
                  />
                  {i.name}
                  | {i.state_id}
                </li>))}
              </ul>
            </div>)
            : (<p>not yet loaded ...</p>)

        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
