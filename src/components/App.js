import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { RelativeFragment as Fragment, Link } from 'redux-little-router'

import './App.css'
import { tasksLoaded, setTask } from '../actions'
import TaskEditor from './TaskEditor'
import TaskList from './TaskList'

const dataQuery = gql`query taskquery {
  tasks { id, name, state_id, project_id, priority }
  projects { id, name }
  taskStates { id, name }
}`

const mapStateToProps = (state) => {
  console.log('state', state)
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTaskCheck: (task) => {
      const data = {
        id: task.id,
        state_id: (task.state_id === 0) ? 5 : 0,
      }
      dispatch(setTask(data))
    },
    onSave: (task) => {
      console.log('saving', task)
      dispatch(setTask(task))
    },
  }
}

class App extends Component {
  render() {
    const {
      onTaskCheck,
      onSave,
      data,
      pageState,
      router,
    } = this.props
    console.log('props', this.props)
    return (
      <div className="App">
        <div className="App-header">
          <h2>project-man 2017</h2>
        </div>
        <div>
          <Link href="/tasks">Tasks</Link>&nbsp;
          <Link href="/projects">Projects</Link>
        </div>
        <hr />
        <Fragment forRoute="/tasks">
          <TaskEditor
            onSave={onSave}
            taskStates={data.taskStates}
            projects={data.projects}
            data={(router.params.id) ? { id: `${router.params.id}` } : { id: 0 }}
          />
          <TaskList data={data.tasks} onTaskCheck={onTaskCheck} />
        </Fragment>
      </div>
    )
  }
}

export default compose(
  graphql(dataQuery),
  connect(mapStateToProps, mapDispatchToProps),
)(App)
