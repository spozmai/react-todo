import React from 'react';

function TodoList({ todoList }) {
  return (
    <ul>
      {todoList.length > 0 ? (
        todoList.map((todo) => <li key={todo.id}>{todo.title}</li>)
      ) : (
        <li>No todos available</li>
      )}
    </ul>
  );
}

export default TodoList;
