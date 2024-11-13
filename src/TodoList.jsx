import React from 'react';

const todoList = [
    { id: 1, task: 'Learn React' },
    { id: 2, task: 'Build a Todo App' },
    { id: 3, task: 'Refactor Code' }
];

function TodoList() {
    return (
        <ul>
            {todoList.map((item) => (
                <li key={item.id}>{item.task}</li>
            ))}
        </ul>
    );
}
export default TodoList;