// @flow

import React from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import { provideRouter } from 'redux-little-router'

import client from './ApolloClient'
import App from './components/App'
import store from './store'
import './index.css'

const AppWithRouter = provideRouter({ store })(App)

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <AppWithRouter />
  </ApolloProvider>,
  document.getElementById('root'),
)
