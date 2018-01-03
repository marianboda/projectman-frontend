import React from 'react'
import { Link } from 'redux-little-router'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

const projectsQuery = gql`query projectsQuery {
  projects {
    id
    name
  }
}`

class ProjectList extends React.Component {
  render() {
    const { data: { projects } } = this.props
    console.log('tasklist data', this.props.data)
    // const sort = R.sortWith([R.descend(R.prop('state_id')), R.descend(R.prop('priority'))])
    return (
      <div>
        {
          (projects && projects.length > 0)
            ? (<div>
              <h3>Projects:</h3>
              <table>
                <thead>
                  <tr>
                    <th>name</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(i => {
                    return (
                      <tr key={i.id} className={`tr-task tr-task-state-${i.state_id}`}>
                        <td><Link href={`/tasks/${i.id}`}>{i.name}</Link></td>
                      </tr>
                    )
                  })}
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
  graphql(projectsQuery),
)(ProjectList)
