import React from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'

import client from './ApolloClient'
import App from './components/App'
import store from './store'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
