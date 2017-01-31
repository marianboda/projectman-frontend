import { createStore } from 'redux'

const initialState = {
  tasks: [],
  projects: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TASKS_LOADED':
      return { ...state, tasks: action.payload }
    default:
      return state
  }
}

const store = createStore(reducer)

export default store
