export const saveToStorage = (key, data) => {
  return localStorage.setItem(key, JSON.stringify(data))
}

export const getFromStorage = (key) => {
  let data = localStorage.getItem(key)
  if (!data) { data = JSON.stringify({}) }
  return JSON.parse(data)
}
