# Fullstack Todo App

The scaffold provides the file structure and component shells. Implement the TODO stubs to make the app functional.

## `backend/app.py`

Help me implement the four route handlers:

- `GET /api/todos` — return `_todos` as a JSON array
- `POST /api/todos` — create a todo with a unique id, `text` from the request body, and `completed: false`. Return 201. Return 400 if text is empty or missing.
- `PATCH /api/todos/<todo_id>` — update the `completed` field of the matching todo. Return 404 if not found.
- `DELETE /api/todos/<todo_id>` — remove the matching todo. Return 204.

## `frontend/src/App.jsx`

Fill in the three TODO sections:

- Fetch todos from `http://localhost:8000/api/todos` on mount and store in state
- `addTodo` — POST the input text to the API, append the returned todo to state, clear the input
- `toggleTodo` — PATCH the todo's `completed` field (flip it), update state with the returned todo

## `frontend/src/utils.js`

Implement the two stub functions:

- `getItemsLeft(todos)` — count todos where `completed === false`, return `"N item left"` (singular) or `"N items left"` (plural)
- `formatText(text)` — return `text.trim()`
