import { useEffect, useState } from "react";
import "./App.css";

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

  const handleToggle = async (todo) => {
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

  const handleDelete = async (todoId) => {
    await fetch(`http://localhost:4000/todo/${todoId}`, {
      method: "DELETE",
    });

    setTodos((prev) => prev.filter((t) => t.id !== todoId));
  };

  const handleSubmit = async (e) => {
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

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button>추가</button>
      </form>

      <ul>
        <h2> --- 할일 목록 ---</h2>
        {todos
          .filter((todo) => todo.completed === false)
          .map((todo) => {
            return (
              <li key={todo.id}>
                <p>{todo.title}</p>
                <p>{todo.createdAt}</p>
                <div>
                  <button onClick={() => handleToggle(todo)}>
                    {todo.completed ? "취소" : "완료"}
                  </button>
                  <button onClick={() => handleDelete(todo.id)}>삭제</button>
                </div>
              </li>
            );
          })}

        <h2> --- 완료 목록 ---</h2>
        {todos
          .filter((todo) => todo.completed === true)
          .map((todo) => {
            return (
              <li key={todo.id}>
                <p>{todo.title}</p>
                <p>{todo.createdAt}</p>
                <div>
                  <button onClick={() => handleToggle(todo)}>
                    {todo.completed ? "취소" : "완료"}
                  </button>
                  <button onClick={() => handleDelete(todo.id)}>삭제</button>
                </div>
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default App;
