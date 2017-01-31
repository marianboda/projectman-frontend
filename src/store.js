import { createStore } from 'redux'

const initialState = {
  tasks: [],
  projects: [],
}

const reducer = (state = initialState, action) => {
  console.log('running reducer: ', action)
  switch (action.type) {
    case 'TASKS_LOADED':
      return { ...state, tasks: action.payload.tasks }
    default:
      return state
  }
}

const store = createStore(reducer)

export default store
