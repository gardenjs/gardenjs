import {
  A11Y_CLEAR_HIGHLIGHT,
  A11Y_HIGHLIGHT,
  A11Y_RESULT,
  A11Y_SCAN,
  A11Y_SCAN_START,
} from './messages.js'

export function emptyA11yState() {
  return {
    scanning: false,
    results: null,
    error: null,
  }
}

export function resolveA11yPayload(a11yActive, a11y) {
  if (!a11yActive) return { disable: true }
  return a11y ?? {}
}

export function a11yScanMessage(a11yActive, a11y) {
  return {
    type: A11Y_SCAN,
    a11yPaneActive: true,
    a11y: resolveA11yPayload(a11yActive, a11y),
  }
}

export function a11yInactiveMessage() {
  return {
    type: A11Y_SCAN,
    a11yPaneActive: false,
  }
}

export function a11yHighlightMessage(section, targets) {
  return {
    type: A11Y_HIGHLIGHT,
    section,
    targets: targets.map((target) => [...target]),
  }
}

export function a11yClearHighlightMessage() {
  return { type: A11Y_CLEAR_HIGHLIGHT }
}

export function a11yConfigAction(prev, next, paneActive) {
  if (!prev || !paneActive) return 'none'
  if (prev.active === next.active && prev.a11y === next.a11y) return 'none'
  if (!next.active) return 'deactivate'
  return 'scan'
}

export function a11yStateFromFrameMessage(data, paneActive) {
  if (!paneActive) return null
  if (data?.type === A11Y_SCAN_START) {
    return {
      scanning: true,
      results: null,
      error: null,
    }
  }
  if (data?.type === A11Y_RESULT) {
    return {
      scanning: false,
      results: data.results ?? null,
      error: data.error ?? null,
    }
  }
  return null
}
