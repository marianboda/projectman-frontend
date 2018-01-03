import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { Fragment } from 'redux-little-router'

import './App.css'
import { setTask, navigate } from '../actions'
import Header from './Header'
import ProjectList from './ProjectList'
import TaskPage from './TaskPage'

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
      dispatch(navigate('/tasks'))
    },
  }
}

class App extends Component {
  render() {
    const {
      onTaskCheck,
      onSave,
      data,
      router,
    } = this.props
    console.log('props', this.props)
    const currentId = Number((router.params && router.params.id) || 0)
    return (
      <div className="App">
        <Header pathname={router.pathname} />
        <div className="content">
          <Fragment forRoute="/tasks">
            <TaskPage {...{ onSave, onTaskCheck, data, currentId }}></TaskPage>
          </Fragment>
          <Fragment forRoute="/projects">
            <ProjectList />
          </Fragment>
        </div>
      </div>
    )
  }
}

export default compose(
  graphql(dataQuery),
  connect(mapStateToProps, mapDispatchToProps),
)(App)
