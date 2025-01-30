import React from "react";
import styles from "./TodoListItem.module.css";

const TodoListItem = ({ todo }) => {
  return <li className={styles.ListItem}>{todo.title}</li>;
};

export default TodoListItem;
