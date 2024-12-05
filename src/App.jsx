import React, { useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);
  const addTodo = (newTodo) => {
    setTodoList((prevTodos) => [...prevTodos, newTodo]);
  };

  return (
    <div>
      <h1>Todo List</h1>
      {

      }
      <TodoList todoList={todoList} />
      {}
      <AddTodoForm onAddTodo={addTodo} />
    </div>
  );
}

export default App;
