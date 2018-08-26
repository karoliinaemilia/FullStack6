import React from 'react'
import { voting } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import Filter from './Filter'

class AnecdoteList extends React.Component {

  vote =  (anecdote) => async () => {
    this.props.voting(anecdote)
    this.props.notify(`you voted '${anecdote.content}'`,5)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store}/>

        {this.props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  {
    voting,
    notify
  }
)(AnecdoteList)

export default ConnectedAnecdoteList
