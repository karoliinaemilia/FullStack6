export const anecdoteCreation = (data) => {
  return {
    type: 'CREATE',
    data
  }
}

export const voting = (id) => {
  return {
    type: 'VOTE',
    id
  }
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}


const reducer = (store = [], action) => {
  switch(action.type) {
  case 'VOTE':
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)
    return [...old, { ...voted, votes: voted.votes+1 }]
  case 'CREATE':
    return [...store, action.data]
  case 'INIT_ANECDOTES':
    return action.data
  default:
    return store
  }
}

export default reducer