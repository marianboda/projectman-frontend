// @flow
import React, { PropTypes } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import R from 'ramda'

const taskByIdQuery = gql`query TaskByIdQuery($id: Int) { task(id: $id) { id name state_id project_id priority } }`

type Props = {
  onSave: Function,
  taskStates: Object[],
  projects: Object[],
  data: Object,
}

class TaskEditor extends React.Component {

  state: {
    id: ?number,
    name: string,
    project_id: ?number,
    state_id: ?number,
    priority: ?number,
  }

  props: Props

  constructor() {
    super()
    const that: any = this
    that.onSave = this.onSave.bind(this)
    that.onChange = this.onChange.bind(this)
    that.state = {}
  }
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.data && nextProps.data.task) {
      this.setState(nextProps.data.task)
    } else {
      this.reset()
    }
  }
  reset() {
    this.setState({
      id: undefined,
      name: '',
      project_id: 0,
      state_id: 1,
      priority: 50,
    })
  }
  onSave(e) {
    e.preventDefault()
    const fields = [
      'id',
      'name',
      'project_id',
      'state_id',
      'priority',
    ]
    if (typeof this.props.onSave === 'function') {
      this.props.onSave(R.pick(fields, this.state))
    }
    this.reset()
  }

  onChange(e) {
    const { name, value } = e.currentTarget
    this.setState({ [name]: value })
  }

  render() {
    const {
      taskStates,
      projects,
    } = this.props

    const projectsWithZero = R.prepend({ id: 0, name: '-' }, projects)
    const statesWithZero = R.prepend({ id: 0, name: '-' }, taskStates)

    console.log('taskEditor props', this.props)

    return (
      <form onSubmit={this.onSave}>
        <table>
          <tbody>
            <tr>
              <td>ID:</td>
              <td>{this.state.id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>
                <input
                  name="name"
                  type="text"
                  onChange={this.onChange}
                  value={this.state.name || ''}
                />
              </td>
            </tr>
            <tr>
              <td>Project</td>
              <td><select name="project_id" value={this.state.project_id} onChange={this.onChange}>
                { projectsWithZero.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
              </select></td>
            </tr>
            <tr>
              <td>State</td>
              <td>
                <select name="state_id" value={this.state.state_id} onChange={this.onChange}>
                  { statesWithZero.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                </select>
              </td>
            </tr>
            <tr>
              <td>Priority</td>
              <td>
                <input
                  name="priority"
                  type="number"
                  value={this.state.priority || 0}
                  onChange={this.onChange}
                />
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>
                <button disabled={this.state.name === ''}>SAVE</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    )
  }
}

export default compose(
  graphql(taskByIdQuery, { options: ({ taskId }) => ({ variables: { id: taskId } }) })
)(TaskEditor)
