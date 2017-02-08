import client from './ApolloClient'
import gql from 'graphql-tag'

const apiConfig = {
  method: 'POST',
  headers: new Headers({ 'Content-Type': 'application/json' }),
}

export const query = (q) => {
  const queryStr = JSON.stringify({ query: q })
  console.log('q = ', queryStr)
  return fetch('/graphql', { ...apiConfig, body: queryStr })
}

export const mutate = (mutation) => {
  const q = {
    mutation: gql`mutation { setTask(task: { name: "${new Date().getSeconds()}"}) { id, name, state_id } }`,
    refetchQueries: [{ query: gql`query taskquery {
        tasks {
          id
          name
          state_id
          project_id
          priority
          __typename
        }
      }
      ` }],
  }

  return client.mutate(q)
}

const quoteVal = (val) => {
  return JSON.stringify(val)
}

export const setTask = (rec) => {
  const select = ['id', 'name', 'state_id'].join(', ')
  const vals = Object.keys(rec).map(i => `${i}: ${quoteVal(rec[i])}`).join(', ')
  const q = `mutation { setTask(task: {${vals}}) { ${select} } }`
  // return query(q)
  return mutate()
}
