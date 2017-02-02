import * as gql from './gql'

export const tasksLoaded = (data) => ({
  type: 'TASKS_LOADED',
  payload: data,
})

const taskUpdate = (data) => ({
  type: 'TASK_UPDATE',
  payload: data,
})

export const setTask = (data) => (dispatch) => {
  dispatch({
    type: 'SET_TASK',
    payload: data,
  })
  gql.setTask(data)
    .then(res => res.json())
    .then((res) => dispatch(taskUpdate(res.data.setTask)))
}
