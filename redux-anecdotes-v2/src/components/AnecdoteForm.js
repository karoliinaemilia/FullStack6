import React from 'react'
import { actionFor } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.store.dispatch(actionFor.anecdoteCreation(content))
    this.props.store.dispatch(notificationChange(`'${content}' was added`))
    e.target.anecdote.value = ''

    setTimeout(() => {
      this.props.store.dispatch(notificationChange(''))
    }, 5000)
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default AnecdoteForm
