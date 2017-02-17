import React, { PropTypes } from 'react'
import getFormData from 'get-form-data'
import R from 'ramda'

class TaskEditor extends React.Component {
  constructor() {
    super()
    this.onSave = this.onSave.bind(this)
    this.onChange = this.onChange.bind(this)
    this.state = {}
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState(nextProps.data)
    }
  }
  onSave(e) {
    e.preventDefault()
    if (typeof this.props.onSave === 'function') {
      this.props.onSave(R.pickBy((_, key) => key !== '__typename', this.state))
    }
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
                <button>SAVE</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    )
  }
}

TaskEditor.propTypes = {
  // data: PropTypes.shape({
  //   name: PropTypes.string,
  //   state_id: PropTypes.number,
  //   project_id: PropTypes.number,
  // }),
  taskStates: PropTypes.array,
  projects: PropTypes.array,
  onSave: PropTypes.func,
}

TaskEditor.defaultProps = {
  data: {
    name: '',
    state_id: 2,
    project_id: 0,
  },
  taskStates: [],
  projects: [],
  onSave: null,
}

export default TaskEditor
