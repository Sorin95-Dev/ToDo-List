import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import './App.css';

const API_URL = 'https://playground.4geeks.com/todo';
const USERNAME = 'Sorin';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/users/${USERNAME}`);
      
      if (response.ok) {
        const data = await response.json();
        setTodos(data.todos || []);
      } else if (response.status === 404) {
        await createUser();
        setTodos([]);
      } else {
        throw new Error('Error al cargar las tareas');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async () => {
    try {
      const response = await fetch(`${API_URL}/users/${USERNAME}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Error al crear usuario');
      }
    } catch (err) {
      console.error('Error creando usuario:', err);
    }
  };

  const addTodo = async (text) => {
    try {
      const response = await fetch(`${API_URL}/todos/${USERNAME}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          label: text,
          is_done: false
        })
      });

      if (response.ok) {
        await loadTodos();
      } else {
        throw new Error('Error al agregar tarea');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await loadTodos();
      } else {
        throw new Error('Error al eliminar tarea');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    }
  };

  const deleteAllTodos = async () => {
    try {
      const deletePromises = todos.map(todo => 
        fetch(`${API_URL}/todos/${todo.id}`, { method: 'DELETE' })
      );
      
      await Promise.all(deletePromises);
      await loadTodos();
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '40px 20px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: 'white', borderRadius: '8px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', fontSize: '32px', color: '#333', marginBottom: '24px' }}>Lista de Tareas</h1>

        {error && (
          <div style={{ padding: '12px', marginBottom: '16px', backgroundColor: '#fee', color: '#c00', borderRadius: '4px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <TodoForm onAddTodo={addTodo} disabled={loading} />

        {loading ? (
          <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>Cargando tareas...</p>
        ) : (
          <>
            {todos.length > 0 && (
              <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                <button
                  onClick={deleteAllTodos}
                  style={{
                    padding: '10px 20px',
                    fontSize: '14px',
                    color: 'white',
                    backgroundColor: '#dc3545',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  🗑️ Limpiar todas las tareas
                </button>
              </div>
            )}

            <div>
              {todos.length > 0 ? (
                todos.map(todo => (
                  <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} />
                ))
              ) : (
                <p style={{ textAlign: 'center', padding: '40px 20px', color: '#999', fontSize: '18px' }}>
                  No hay tareas, añadir tareas
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
