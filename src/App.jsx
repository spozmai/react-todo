// /src/App.jsx
import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function App() {
    const [newTodo, setNewTodo] = useState('');
    const todos = [{ id: 1, title: "Sample Todo" }];

    return (
        <div>
            <AddTodoForm onAddTodo={setNewTodo} />
            <p>New Todo: {newTodo}</p>
            <TodoList todos={todos} />
        </div>
    );
}

export default App;
