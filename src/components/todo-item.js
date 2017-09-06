import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';

export class TodoItem extends Component {

  constructor(props) {
    super(props);
  }

  checkboxChange = (e, check) => {
    this.setState({
      todo: {
        ...this.props.todo,
        done: check
      }
    });
    this.props.onChange(check, this.props.todo.id);
  }

  delete = () => {
    this.props.onDelete(this.props.todo.id);
  }

  render () {
    return (
      <li>
        <Checkbox checked={this.props.todo.done}
        labelPosition="left"
        className='todo-checkbox'
        onCheck={this.checkboxChange}/>
        <p id='todo-text'
          className={this.props.todo.done ? 'finished' : 'none'}>
          {this.props.todo.text}
        </p>
        <i id='remove-icon' onClick={this.delete} className="material-icons">clear</i>
      </li>
    )
  }
}
