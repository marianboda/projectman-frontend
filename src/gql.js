const apiConfig = {
  method: 'POST',
  headers: new Headers({ 'Content-Type': 'application/json' }),
}

export const query = (q) => {
  const queryStr = JSON.stringify({ query: q })
  console.log('q = ', queryStr)
  return fetch('/graphql', { ...apiConfig, body: queryStr })
}

const quoteVal = (val) => {
  return JSON.stringify(val)
}

export const setTask = (rec) => {
  const select = ['id', 'name'].join(',')
  const vals = Object.keys(rec).map(i => `${i}: ${quoteVal(rec[i])}`).join(', ')
  const q = `mutation { setTask(task: {${vals}}) { ${select} } }`
  return query(q)
}
