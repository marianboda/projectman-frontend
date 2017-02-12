import React from 'react'

class TaskEditor extends React.Component {

  handle(e) {
    const { name, value } = e.currentTarget
    console.log('handle: ', name, value)
    if (typeof this.props.onChange === 'function') {
      this.props.onChange({ [name]: value })
    }
  }

  render() {
    const {
      data,
      taskStates,
      projects,
    } = this.props
    const changeHandler = this.handle.bind(this)
    const onSave = () => console.log('save')
    return (
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td><input name="name" type="text" onChange={changeHandler} value={data.name}/></td>
          </tr>
          <tr>
            <td>Project</td>
            <td><select name="project_id" onChange={changeHandler}>
              { projects &&
                projects.map(i => <option value={i.id}>{i.name}</option>)}
            </select></td>
          </tr>
          <tr>
            <td>State</td>
            <td>
              <select name="state_id" onChange={changeHandler}>
                { taskStates &&
                  taskStates.map(i => <option value={i.id}>{i.name}</option>)}
              </select>
            </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>
              <button onClick={onSave} >SAVE</button>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default TaskEditor
