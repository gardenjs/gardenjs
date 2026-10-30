import { writable, get } from 'svelte/store'

export const inspectorElements = writable([])
export const showInspector = writable(false)
export const showDistanceMeasure = writable(false)

export function setInspectorElements(elements) {
  inspectorElements.set(elements ?? [])
}
export function toggleShowInspector() {
  showInspector.set(!get(showInspector))
  if (get(showInspector) && get(showDistanceMeasure)) {
    showDistanceMeasure.set(false)
  }
}

export function toggleShowDistanceMeasure() {
  showDistanceMeasure.set(!get(showDistanceMeasure))
  if (get(showInspector) && get(showDistanceMeasure)) {
    showInspector.set(false)
  }
}
