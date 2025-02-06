import React from 'react';
import PropTypes from 'prop-types';  
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

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, 
      title: PropTypes.string.isRequired,  
    })
  ).isRequired,  
  onRemoveTodo: PropTypes.func.isRequired,  
};

export default TodoList;
