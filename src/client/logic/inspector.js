import { writable } from 'svelte/store'

export const inspectorElements = writable([])

export function setInspectorElements(elements) {
  inspectorElements.set(elements ?? [])
}
