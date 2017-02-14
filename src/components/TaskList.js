import React from 'react'

class TaskList extends React.Component {
  render() {
    const { data, onTaskCheck } = this.props
    return (
      <div>
        {
          (data && data.length > 0)
            ? (<div>
              <h3>Tasks:</h3>
              <ul>
                {data.map(i => (<li>
                  <input
                    type="checkbox"
                    checked={i.state_id === 5}
                    onChange={((j) => () => onTaskCheck(j))(i)}
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

export default TaskList
