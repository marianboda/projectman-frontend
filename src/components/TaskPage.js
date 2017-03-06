import React from 'react'
import TaskEditor from './TaskEditor'
import TaskList from './TaskList'

export default class TaskPage extends React.Component {
  render() {
    const {
      onTaskCheck,
      onSave,
      data,
      currentId,
    } = this.props
    return (
      <div>
        <TaskEditor
          onSave={onSave}
          taskStates={data.taskStates}
          projects={data.projects}
          taskId={currentId}
        />
        <TaskList
          onTaskCheck={onTaskCheck}
        />
      </div>
    )
  }
}
