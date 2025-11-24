import { useState } from 'react';

function TodoItem({ todo, onDelete }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px',
        backgroundColor: '#f9f9f9',
        borderRadius: '4px',
        marginBottom: '8px'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{ flex: 1, fontSize: '16px' }}>{todo.label || todo.text}</span>
      {isHovered && (
        <button
          onClick={() => onDelete(todo.id)}
          style={{
            padding: '6px 12px',
            fontSize: '14px',
            color: 'white',
            backgroundColor: '#dc3545',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ❌
        </button>
      )}
    </div>
  );
}

export default TodoItem;
