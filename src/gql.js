import gql from 'graphql-tag'
import client from './ApolloClient'

const getTasksQuery = gql`query taskquery {
  tasks {
    id
    name
    state_id
    project {
      id
      name
    }
    priority
  }
}`

const setTaskMutation = gql`mutation setTask($task: TaskInput) {
  setTask(task: $task) { id, name, state_id }
}`

export const setTask = (rec: Object) => {
  return client.mutate({
    mutation: setTaskMutation,
    variables: { task: rec },
    refetchQueries: [{ query: getTasksQuery }],
  })
}
