import React from 'react'
import { actionFor } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import Filter from './Filter'

class AnecdoteList extends React.Component {

  vote = (id, content) => () => {
    this.props.store.dispatch(actionFor.voting(id))
    this.props.store.dispatch(notificationChange(`you voted '${content}'`))

    setTimeout(() => {
      this.props.store.dispatch(notificationChange(''))
    }, 5000)
  }

  render() {
    const anecdotes = this.props.store.getState().anecdotes
    const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(this.props.store.getState().filter.toLowerCase()))
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store}/>

        {filteredAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote.id, anecdote.content)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
