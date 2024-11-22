// /src/AddTodoForm.jsx
function AddTodoForm({ onAddTodo }) {
    const handleAddTodo = (event) => {
        event.preventDefault();
        const todoTitle = event.target.title.value;
        onAddTodo(todoTitle); // Update state in parent
        event.target.reset(); // Clear form
    };

    return (
        <form onSubmit={handleAddTodo}>
            <input type="text" name="title" placeholder="Enter todo" />
            <button type="submit">Add</button>
        </form>
    );
}

export default AddTodoForm;
