import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const setFetch = async () => {
      const res = await fetch("");
      const data = await res.json();
      setTodos(data);
    };
  }, []);
  return (
    <>
      <h1>Todo List</h1>
      <form>
        <input type="text" />
        <button>추가</button>
      </form>

      <p> --- 할일 목록 ---</p>
      {todos.map((todo) => {
        return (
          <>
            {" "}
            <p>{todo.title}</p>
            <p>{todo.createdAt}</p>
            <div>
              <button>완료</button>
              <button>삭제</button>
            </div>
          </>
        );
      })}
    </>
  );
}

export default App;
