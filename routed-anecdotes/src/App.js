import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { FormGroup, ControlLabel, FormControl, Button, ListGroup, ListGroupItem, Grid, Row, Col, Alert, Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Menu = () => {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          Software anecdotes
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <LinkContainer exact to='/'> 
            <NavItem>anecdotes</NavItem>
          </LinkContainer>
          <LinkContainer to='/create'>
            <NavItem>create new</NavItem>
          </LinkContainer>
          <LinkContainer to='/about'>
            <NavItem>about</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
        {anecdotes.map(anecdote => 
        <ListGroupItem key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}> {anecdote.content} </Link>
        </ListGroupItem>
      )}
    </ListGroup> 
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    

    <Grid>
      <Row>
        <Col xs={8}>
        <p>According to Wikipedia:</p>
        <em>An anecdote is a brief, revealing account of an individual person or an incident. 
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
          An anecdote is "a story with a point."
        </em>
        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Col>
        <Col xs={4}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/EdsgerDijkstra.jpg" alt='' style={{ height: "100%", width: "100%" }}/>
          <a href='https://cs.utexas.edu/users/EWD/' style={{textDecoration: 'underline'}}>image source</a>
        </Col>
      </Row>
    </Grid>
    <br/>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}

const Notification = ( {notification} ) => {
  if (notification !== '') {
    return (
      <Alert bsStyle="success">
        {notification}
      </Alert>
    )
  }
  return  null
}

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: '',
      added: false
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })

    this.props.setNotification(`a new anecdote ${this.state.content} created!`)

    this.setState({
      added: true
    })

  }

  render() {
    return(
      <div>
        {this.state.added ? <Redirect to='/'/> : null}
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <div>
              <ControlLabel>
              content:
              </ControlLabel>
              <FormControl
                name='content' 
                value={this.state.content} 
                onChange={this.handleChange} 
              />
            </div>
            <div>
              <ControlLabel>
              author:
              </ControlLabel>
              <FormControl
                name='author' 
                value={this.state.author} 
                onChange={this.handleChange} 
              />
            </div>
            <div>
              <ControlLabel>
              url for more info:
              </ControlLabel>
              <FormControl
                name='info' 
                value={this.state.info} 
                onChange={this.handleChange} 
              />
            </div> 
            <Button bsStyle="primary" type="submit">create</Button>
          </FormGroup>
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  setNotification = (notification) => {
    this.setState({
      notification
    })

    setTimeout(() => {
      this.setState({
        notification: ''
      })
    }, 10000);
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div className='container'>
        <Router>
          <div>
            <Menu />
            <Notification notification={this.state.notification} />
              <div>
                <Route exact path='/' render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
                <Route path='/about' render={() => <About /> } />     
                <Route path='/create' render={() => <CreateNew addNew={this.addNew} setNotification={this.setNotification}/>} />
                <Route exact path='/anecdotes/:id' render={({match}) =>
                  <Anecdote anecdote={this.anecdoteById(match.params.id)} /> }
                />
              </div>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
 