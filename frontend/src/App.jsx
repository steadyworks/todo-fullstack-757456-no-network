import { useState, useEffect } from 'react'
import { getItemsLeft } from './utils'

export default function App() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    fetch(`/todos`).then(r => r.json()).then(setTodos)
  }, [])

  const addTodo = async () => {
    const trimmed = text.trim()
    if (!trimmed) return
    const res = await fetch(`/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: trimmed }),
    })
    const todo = await res.json()
    setTodos(prev => [...prev, todo])
    setText('')
  }

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id)
    const res = await fetch(`/todos/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/xml' },
      body: JSON.stringify({ completed: !todo.completed }),
    })
    const updated = await res.json()
    setTodos(prev => prev.map(t => t.id === id ? updated : t))
  }

  return (
    <div>
      <h1>Todo</h1>
      <div>
        <input
          data-testid="todo-input"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="What needs to be done?"
        />
        <button data-testid="add-button" onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} data-testid="todo-item">
            <span
              data-testid={`toggle-${todo.id}`}
              className={todo.completed ? 'completed' : ''}
              onClick={() => toggleTodo(todo.id)}
              style={{ cursor: 'pointer', textDecoration: !todo.completed ? 'line-through' : 'none' }}
            >
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
      <p data-testid="items-left">{getItemsLeft(todos)}</p>
    </div>
  )
}
