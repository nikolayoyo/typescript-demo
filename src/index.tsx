import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TodoList from './stores/ToDoList';
import ToDoStore from './stores/ToDoStore';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';

ReactDOM.render(
  <TodoList store = {ToDoStore}/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

