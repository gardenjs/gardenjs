import { serializeAxeResults } from './serializeAxeResults.js'
import { A11Y_RESULT, A11Y_SCAN_START } from './messages.js'
import { isA11yDisabled } from './a11yConfig.js'
import { runA11yScan } from './runA11yScan.js'

const AUTO_SCAN_DELAY_MS = 400

let debounceTimer
let pendingRoot
let pendingA11y
let scanGeneration = 0

function notifyScanStart() {
  window.parent.postMessage({ type: A11Y_SCAN_START }, window.location.origin)
}

export function scheduleA11yScan(root, a11y) {
  if (isA11yDisabled(a11y)) return
  pendingRoot = root ?? pendingRoot
  pendingA11y = a11y ?? pendingA11y
  if (!pendingRoot) return
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    void runA11yScanAndReport(pendingRoot, pendingA11y)
  }, AUTO_SCAN_DELAY_MS)
}

export async function runA11yScanAndReport(root, a11y) {
  if (!root || isA11yDisabled(a11y)) return

  scanGeneration += 1
  const generation = scanGeneration
  notifyScanStart()

  try {
    const results = await runA11yScan(a11y)
    if (generation !== scanGeneration) return
    window.parent.postMessage(
      { type: A11Y_RESULT, results: serializeAxeResults(results) },
      window.location.origin
    )
  } catch (err) {
    if (generation !== scanGeneration) return
    const message =
      err instanceof Error ? err.message : 'Accessibility scan failed.'
    window.parent.postMessage(
      { type: A11Y_RESULT, error: message },
      window.location.origin
    )
  }
}
