import React, { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo";
import "./styles/global.css";

const App = () => {
  const [todoList, setTodoList] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 

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

      const todos = data.records.map((todo) => ({
        id: todo.id,
        title: todo.fields.title,
      }));

      setTodoList(todos); 
    } catch (error) {
      console.error("Error fetching todos:", error.message);
    } finally {
      setIsLoading(false); 
    }
  };


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

      setTodoList((prev) => [
        ...prev,
        { id: data.id, title: data.fields.title },
      ]);
    } catch (error) {
      console.error("Error adding todo:", error.message);
    }
  };

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

    
      setTodoList((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error.message);
    }
  };

 
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
