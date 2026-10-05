import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { addTodo, deleteTodo, toggleTodo, clearCompleted } from './actions'
import PrioritySelect from './PrioritySelect'
import './styles.css'

// Always render fresh data on each request (don't cache at build time)
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config })

  // Read todos straight from the database with the Local API
  const { docs: todos } = await payload.find({
    collection: 'todos',
    sort: '-createdAt', // newest first
    limit: 100,
  })

  const remaining = todos.filter((t) => !t.completed).length
  const completed = todos.filter((t) => t.completed).length

  return (
    <div className="todo">
      <h1>My Todos</h1>

      {/* Create */}
      <form action={addTodo} className="todo-add">
        <input name="title" placeholder="What needs doing?" required autoComplete="off" />
        <select name="priority" defaultValue="medium">
          <option value='low'>Low</option>
          <option value='medium'>Medium</option>
          <option value='high'>High</option>
        </select>
        <button type="submit">Add</button>
      </form>

      {/* List */}
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'done' : ''}>
            {/* Toggle */}
            <form action={toggleTodo}>
              <input type="hidden" name="id" value={todo.id} />
              <input type="hidden" name="completed" value={String(!!todo.completed)} />
              <button type="submit" className="check" aria-label="Toggle complete">
                {todo.completed ? '✓' : ''}
              </button>
            </form>

            <span className="title">{todo.title}</span>
            <span className="badge">{todo.priority}</span>

            <PrioritySelect key={`${todo.id}-${todo.priority}`} id={todo.id} priority={todo.priority} />

            {/* Delete */}
            <form action={deleteTodo}>
              <input type="hidden" name="id" value={todo.id} />
              <button type="submit" className="delete" aria-label="Delete">
                ×
              </button>
            </form>
          </li>
        ))}
      </ul>

      {todos.length === 0 && <p className="empty">Nothing to do yet. Add one above.</p>}

      <p className="footer">
        {remaining} of {todos.length} left · <a href="/admin">Open admin panel</a>
      </p>
      {completed > 0 && 
        <form action={clearCompleted}>
          <button>Clear completed ({completed})</button>
        </form>
      }
    </div>
  )
}
