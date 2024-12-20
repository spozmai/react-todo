import React from 'react';
import TodoListItem from './TodoListItem';

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <ul>
      {todoList.length > 0 ? (
        todoList.map((todo) => (
          <TodoListItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            onRemoveTodo={onRemoveTodo}
          />
        ))
      ) : (
        <li>No todos available</li>
      )}
    </ul>
  );
}

export default TodoList;
