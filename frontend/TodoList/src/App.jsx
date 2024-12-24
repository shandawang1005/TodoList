import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/api/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos", error));
  }, []);

  const addTodo = () => {
    fetch("http://localhost:5001/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTodo }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos((prevTodos) => [...prevTodos, data]);
        setNewTodo("");
      });
  };
  const deleteTodo = (id) => {
    fetch(`http://localhost:5001/api/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id != id));
      })
      .catch((error) => console.error("Error deleting todo", error));
  };

  const toggleComplete = (id, currentStatus) => {
    fetch(`http://localhost:5001/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !currentStatus }),
    })
      .then((response) => response.json())
      .then((updateTodo) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo._id == id ? updateTodo : todo))
        );
      });
  };

  return (
    <>
      <div>
        <h1>Todo List</h1>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new Todo"
        />
        <button onClick={addTodo}>Add</button>
        <ul>
          {todos.map((todo) => (
            <li key={todo._id}>
              {todo.title}
              <button onClick={() => deleteTodo(todo._id)}>delete</button>
              <button onClick={() => toggleComplete(todo._id, todo.completed)}>
                {todo.completed ? "Marked as Incomplete" : "Marked as finished"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
