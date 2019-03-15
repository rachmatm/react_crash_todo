import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import Header from './components/layout/Header';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import uuid from 'uuid'
import Axios from 'axios';

import './App.css';


class App extends Component {
  state = {
    todos: [],
    alert: ''
  }

  componentDidMount() {
    Axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data }))
  }

  clearAlert = () => {
    setTimeout(
      function() {
          this.setState({alert: ""});
      }
      .bind(this),
      3000
    );
  }

  // Toggle Complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id == id) {
        todo.completed = !todo.completed;
      }
      return todo;
    })});
  }

  //Delete Todo
  delTodo = (id) => {
    Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res =>  this.setState({ todos: [...this.state.todos.filter(todo => todo.id != id)]}));
  }

  addTodo = (title) => {
    const newTodo = {
      id: uuid.v4(),
      title,
      completed: false
    }

    Axios.post('https://jsonplaceholder.typicode.com/todos', newTodo)
      .then(res => {
        this.setState({alert: "New todo successfully created!"});
        this.clearAlert();
      })

    this.setState({ todos: [...this.state.todos, newTodo]})  
  }

  render() {
    return (
      <Router>
        <div>
          <div className="container">
            <Header />
            <Alert alert={this.state.alert} />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
