import ApolloClient from 'apollo-client'

const client = new ApolloClient({
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) {
      return result.__typename + result.id
    }
    return null
  },
})
console.log(client)

export default client
