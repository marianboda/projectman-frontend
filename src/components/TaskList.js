import React from 'react'
import { Link } from 'redux-little-router'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import R from 'ramda'
import FlipMove from 'react-flip-move'
const taskQuery = gql`query taskQuery { tasks { id name state_id project {id name} priority } }`

class TaskList extends React.Component {
  render() {
    const { onTaskCheck, data: { tasks } } = this.props
    console.log('tasklist data', this.props.data)
    const sort = R.sortWith([R.descend(R.prop('state_id')), R.descend(R.prop('priority'))])
    return (
      <div>
        {
          (tasks && tasks.length > 0)
            ? (<div>
              <h3>Tasks:</h3>
              <table>
                {/* <thead>
                  <tr>
                    <th>-</th>
                    <th>name</th>
                    <th>state</th>
                    <th>project</th>
                    <th>priority</th>
                  </tr>
                </thead> */}
                <tbody>
                  <FlipMove duration={350} easing="ease">
                    {sort(tasks).map(i => {
                      return (
                        <tr key={i.id} className={`tr-task tr-task-state-${i.state_id}`}>
                          <td>
                            <input
                              type="checkbox"
                              checked={i.state_id === 5}
                              onChange={((j) => () => onTaskCheck(j))(i)}
                            />
                          </td>
                          <td><Link href={`/tasks/${i.id}`}>{i.name}</Link></td>
                          <td>{i.state_id}</td>
                          <td>{i.project && i.project.name}</td>
                          <td className="task-priority">{i.priority}</td>
                        </tr>
                      )
                    })}
                  </FlipMove>
                </tbody>
              </table>
            </div>)
            : (<p>not yet loaded ...</p>)
        }
      </div>
    )
  }
}

export default compose(
  graphql(taskQuery),
)(TaskList)
