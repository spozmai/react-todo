import React, { useState } from "react";
import "./styles/global.css"; // Import your global styles

const AddTodo = ({ onAddTodo }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      onAddTodo(newTodo.trim());
      setNewTodo(""); // Clear the input field
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
        className="text-input"
      />
      <button type="submit" className="add-button">Add</button>
    </form>
  );
};

export default AddTodo;
