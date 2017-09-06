import React, { Component } from 'react';
import { Card, CardText }  from 'material-ui';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { TodoItem } from './todo-item';

export class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todoInput: '',
      todos: [],
      todosLeft: 0,
      filter: 'all'
    }
  }

  addTodo = (e) => {
    if (e.keyCode !== 13) {
      return;
    }
    this.createTodo(this.state.todoInput);
    this.setState({todoInput: ''});
  }

  createTodo (text) {
    const todo = {
      text: text,
      done: false,
      id: this.nextId()
    };
    const todos = [...this.state.todos, todo];
    this.setState({todos: todos});
    this.remaining(todos);
  }

  nextId() {
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  }

  todoInputChange = (e, newString) => {
    this.setState({todoInput: newString});
  }

  updateTodo = (updatedTodo, id) => {
    const todos = this.state.todos.map(
      (todo, i) => {
        return todo.id !== id ? todo : {
          ...todo,
          done: updatedTodo
        }
      }
    )
    this.setState({todos});
    this.remaining(todos);
  }

  todos = (todo) => {
    return (
          <TodoItem key={todo.id}
            id={todo.id}
            todo={todo}
            onChange={this.updateTodo}
            onDelete={this.deleteTodo}>
          </TodoItem>
        )
  }

  remaining = (todos) => {
    this.setState({todosLeft: todos.filter(todo => !todo.done).length});
  }

  deleteTodo = (id) => {
    const todos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({todos: todos});
    this.remaining(todos);
  }

  filterChange = (e, filter) => {
    this.setState({filter: filter});
  }

  filterTodos = () => {
    switch (this.state.filter) {
      case 'all':
        return this.state.todos;
      case 'active':
        return this.state.todos.filter(todo => !todo.done);
      case 'finished':
        return this.state.todos.filter(todo => todo.done);
      default:
        return this.state.todos;
    }
  }

  render () {
    return (
      <Card expanded={true} initiallyExpanded={true} id='list-container'>
        <CardText>
          <TextField floatingLabelText='Add new todo'
            id='todo-input'
            fullWidth={true}
            value={this.state.todoInput}
            onKeyDown={this.addTodo}
            onChange={this.todoInputChange}/>
            <ul>
              { this.filterTodos().map(this.todos) }
            </ul>
            <p className='left todos-left'>{this.state.todosLeft} todos left</p>
            <RadioButtonGroup className='left'
              name="filter"
              defaultSelected="all"
              onChange={this.filterChange}>
              <RadioButton
                value="all"
                label="All"
                className='left filter-option'
              />
              <RadioButton
                value="active"
                label="Active"
                className='left filter-option'
              />
              <RadioButton
                value="finished"
                label="Finished"
                className='left filter-option'
              />
            </RadioButtonGroup>
        </CardText>
      </Card>
    );
  }
}
