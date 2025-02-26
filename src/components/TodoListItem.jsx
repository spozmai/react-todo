import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./TodoListItem.module.css";

const TodoListItem = ({ todo, onRemoveTodo }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return; // Prevent duplicate clicks

    setIsDeleting(true);
    await onRemoveTodo(todo.id);
    setIsDeleting(false);
  };

  return (
    <li className={styles.ListItem}>
      {todo.title}
      <button 
        onClick={handleDelete} 
        disabled={isDeleting}
        className={styles.DeleteButton}
      >
        {isDeleting ? "Removing..." : "Remove"}
      </button>
    </li>
  );
};

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
