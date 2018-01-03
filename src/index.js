import React from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'

import client from './ApolloClient'
import App from './components/App'
import store from './store'
import './index.css'

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
)
