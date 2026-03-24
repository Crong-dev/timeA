export function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li key={todo.id}>
      <p>{todo.title}</p>
      <p>{todo.createdAt}</p>
      <div>
        <button onClick={() => onToggle(todo)}>
          {todo.completed ? "취소" : "완료"}
        </button>
        <button onClick={() => onDelete(todo.id)}>삭제</button>
      </div>
    </li>
  );
}
