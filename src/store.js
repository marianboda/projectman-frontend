import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { routerForBrowser } from 'redux-little-router'

import client from './ApolloClient'
import routes from './routes'

const initialState = {
  tasks: [],
  projects: [],
}

const reducer = (state = initialState, action) => {
  console.log('running reducer: ', action)
  switch (action.type) {
    case 'TASKS_LOADED':
      return { ...state, tasks: action.payload.tasks }
    case 'TASK_UPDATE':
      if (!action.payload)
        return state
      const foundIndex = state.tasks.findIndex(i => i.id === action.payload.id)
      if (foundIndex > -1) {
        return { ...state, tasks: Object.assign([], state.tasks, { [foundIndex]: action.payload }) }
      }
      return { ...state, tasks: [...state.tasks, action.payload] }
    default:
      return state
  }
}

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const { routerEnhancer, routerMiddleware } = routerForBrowser({ routes })

const store = createStore(
  combineReducers({
    data: reducer,
    apollo: client.reducer(),
  }),
  composeEnhancers(
    routerEnhancer,
    applyMiddleware(
      routerMiddleware,
      client.middleware(),
      thunk,
    ),
  ),
)

export default store
