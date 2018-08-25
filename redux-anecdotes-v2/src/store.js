import { createStore } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'

const store = createStore(anecdoteReducer.reducer)

export default store