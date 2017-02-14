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
    console.log('save', getFormData(e.currentTarget))
    if (typeof this.props.onSave === 'function') {
      const formData = getFormData(e.currentTarget)

      this.props.onSave({ ...formData, ...this.state })
    }
  }

  onChange(e) {
    console.log('target', e.currentTarget.name, e.currentTarget.value)
    const { name, value } = e.currentTarget
    this.setState({ [name]: value+'1' })
  }

  render() {
    const {
      data,
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
              <td>{data.id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td><input name="name" type="text" onChange={this.onChange} value={this.state.name}/></td>
            </tr>
            <tr>
              <td>Project</td>
              <td><select name="project_id">
                { projectsWithZero.map(i => <option value={i.id}>{i.name}</option>)}
              </select></td>
            </tr>
            <tr>
              <td>State</td>
              <td>
                <select name="state_id">
                  { statesWithZero.map(i => <option value={i.id}>{i.name}</option>)}
                </select>
              </td>
            </tr>
            <tr>
              <td>Priority</td>
              <td>
                <td><input name="priority" type="number" /></td>
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
  onSave: PropTypes.function,
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
