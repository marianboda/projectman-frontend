import { PUSH } from 'redux-little-router'
import * as gql from './gql'

export const tasksLoaded = (data) => ({
  type: 'TASKS_LOADED',
  payload: data,
})

export const navigate = (data) => {
  console.log('data: ', data)
  if (typeof data === 'string') {
    return {
      type: PUSH,
      payload: {
        pathname: data,
      },
    }
  }
  return {
    type: 'VOID',
  }
}

export const setTask = (data) => (dispatch) => {
  dispatch({
    type: 'SET_TASK',
    payload: data,
  })
  gql.setTask(data)
    // .then(res => { console.log('res', res); return res.json() })
    // .then((res) => dispatch(taskUpdate(res.data.setTask)))
}
