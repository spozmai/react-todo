import React, { useState, useEffect } from "react";
import AddTodo from "./AddTodo";
import "./styles/global.css";

const App = () => {
  const [todoList, setTodoList] = useState([]); // Stores todos
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch Todos from Airtable
  const fetchData = async () => {
    try {
      const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        },
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error fetching todos: ${response.status}`);
      }

      const data = await response.json();

      // Transform data into the format we need
      const todos = data.records.map((todo) => ({
        id: todo.id,
        title: todo.fields.title,
      }));

      setTodoList(todos); // Update state with todos
    } catch (error) {
      console.error("Error fetching todos:", error.message);
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  // Add a new Todo to Airtable
  const postTodo = async (title) => {
    try {
      const airtableData = {
        fields: { title },
      };

      const response = await fetch(
        `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
          },
          body: JSON.stringify(airtableData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error adding todo: ${response.status}`);
      }

      const data = await response.json();

      // Add the new todo to the state
      setTodoList((prev) => [
        ...prev,
        { id: data.id, title: data.fields.title },
      ]);
    } catch (error) {
      console.error("Error adding todo:", error.message);
    }
  };

  // Remove a Todo from Airtable and State
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error deleting todo: ${response.status}`);
      }

      // Remove the deleted todo from state
      setTodoList((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error.message);
    }
  };

  // Fetch Todos when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodo onAddTodo={postTodo} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todoList.map((todo) => (
            <li key={todo.id}>
              {todo.title}
              <button
                className="delete-button"
                onClick={() => deleteTodo(todo.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
