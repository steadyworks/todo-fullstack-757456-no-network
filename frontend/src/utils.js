export function getItemsLeft(todos) {
  const count = todos.filter(t => !t.completed).length
  return `${count} ${count === 1 ? 'item' : 'items'} left`
}

export function formatText(text) {
  return text.trim()
}
