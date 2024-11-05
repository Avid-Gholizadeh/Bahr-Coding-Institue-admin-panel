export function getLocalStroge(key) {
  return JSON.parse(localStorage.getItem(key))
}
export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
export function deleteLocalStorage(key) {
  localStorage.removeItem(key)
}
