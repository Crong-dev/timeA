import { useEffect, useState } from "react";
import "./App.css";
import { TodoForm } from "../components/TodoForm";
import { TodoItem } from "../components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("http://localhost:4000/todo");
      const data = await res.json();
      setTodos(data);
    };

    fetchTodos();
  }, []);

  const onToggle = async (todo) => {
    const res = await fetch(`http://localhost:4000/todo/${todo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        completed: !todo.completed,
      }),
    });

    const toggleTodo = await res.json();

    setTodos((prev) => prev.map((t) => (t.id === todo.id ? toggleTodo : t)));
  };

  const onDelete = async (todoId) => {
    await fetch(`http://localhost:4000/todo/${todoId}`, {
      method: "DELETE",
    });

    setTodos((prev) => prev.filter((t) => t.id !== todoId));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        completed: false,
        createdAt: new Date(),
      }),
    });

    const addTodo = await res.json();

    setTodos((prev) => [...prev, addTodo]);
    setTitle("");
  };

  return (
    <>
      <h1>Todo List</h1>

      <TodoForm title={title} setTitle={setTitle} onSubmit={onSubmit} />

      <ul>
        <h2> --- 할일 목록 ---</h2>
        {todos
          .filter((todo) => todo.completed === false)
          .map((todo) => {
            return (
              <TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />
            );
          })}

        <h2> --- 완료 목록 ---</h2>
        {todos
          .filter((todo) => todo.completed === true)
          .map((todo) => {
            return (
              <TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />
            );
          })}
      </ul>
    </>
  );
}

export default App;
