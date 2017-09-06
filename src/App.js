import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui';
import { TodoList } from './components/todo-list';
import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <TodoList />
      </MuiThemeProvider>
    );
  }
}

export default App;
