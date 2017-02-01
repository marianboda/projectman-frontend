export const tasksLoaded = (data) => ({
  type: 'TASKS_LOADED',
  payload: data,
})

export const setTask = (data) => ({
  type: 'SET_TASK',
  payload: data,
})
