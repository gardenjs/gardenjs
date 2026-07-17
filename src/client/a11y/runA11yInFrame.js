import { serializeAxeResults } from './serializeAxeResults.js'
import { A11Y_RESULT, A11Y_SCAN_START } from './messages.js'
import { isA11yDisabled, runA11yScan } from './a11yScan.js'

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
    runA11yScanAndReport(pendingRoot, pendingA11y).catch((err) => {
      console.error(err)
    })
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
    window.parent.postMessage(
      { type: A11Y_RESULT, error: String(err?.message ?? err) },
      window.location.origin
    )
  }
}
