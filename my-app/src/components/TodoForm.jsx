import { useState } from 'react';

function TodoForm({ onAddTodo, disabled }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Escribe una tarea y presiona Enter..."
        disabled={disabled}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          boxSizing: 'border-box',
          opacity: disabled ? 0.6 : 1
        }}
      />
    </form>
  );
}

export default TodoForm;
