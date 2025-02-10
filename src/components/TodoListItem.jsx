import React from "react";
import PropTypes from 'prop-types';  
import styles from "./TodoListItem.module.css";

const TodoListItem = ({ todo }) => {
  return <li className={styles.ListItem}>{todo.title}</li>;
};


TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,  
    title: PropTypes.string.isRequired,  
  }).isRequired,  
};

export default TodoListItem;
