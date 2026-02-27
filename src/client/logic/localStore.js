import { writable } from 'svelte/store'

export function localStore(
  name,
  defaultValue,
  parseString = (value) => value,
  stringify = (value) => value
) {
  const store = writable(
    parseString(localStorage.getItem(name)) ?? defaultValue
  )
  store.subscribe((value) => {
    localStorage.setItem(name, stringify(value))
  })
  return store
}

export const textOrNumberParser = (value) => {
  if (Number.isNaN(Number(value))) {
    return value
  }
  return Number(value)
}
