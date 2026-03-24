export function TodoForm({ title, setTitle, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button>추가</button>
    </form>
  );
}
