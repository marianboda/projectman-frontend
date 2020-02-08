import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import './App.css'
import { setTask } from '../actions'
import Header from './Header'
import ProjectList from './ProjectList'
import TaskPage from './TaskPage'
import { Route } from 'react-router'

const dataQuery = gql`query taskquery {
  projects { id, name }
  taskStates { id, name }
}`

const mapStateToProps = (state) => {
  return {
    router: state.router
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTaskCheck: (task) => {
      const data = {
        id: task.id,
        state_id: (task.state_id !== 5) ? 5 : 1,
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
    } = this.props

    console.log('props', this.props)
    const currentId = Number(0)
    return (
      <div className="App">
        <Header pathname={''} />
        <div className="content">
          <Route path="/tasks">
            <TaskPage {...{ onSave, onTaskCheck, data, currentId }}></TaskPage>
          </Route>
          <Route path="/projects">
            <ProjectList />
          </Route>
        </div>
      </div>
    )
  }
}

export default compose(
  graphql(dataQuery),
  connect(mapStateToProps, mapDispatchToProps),
)(App)
