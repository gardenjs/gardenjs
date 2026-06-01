import { setLastAxeResults } from './a11yScanCache.js'
import { serializeAxeResults } from './serializeAxeResults.js'
import { A11Y_RESULT, A11Y_SCAN_START } from './messages.js'
import { runA11yScan } from './runA11yScan.js'

const AUTO_SCAN_DELAY_MS = 400

/** @type {ReturnType<typeof setTimeout> | undefined} */
let debounceTimer
/** @type {HTMLElement | null | undefined} */
let pendingRoot
let scanGeneration = 0

function notifyScanStart() {
  window.parent.postMessage({ type: A11Y_SCAN_START }, window.location.origin)
}

/**
 * Debounced scan after the preview DOM has settled (props / example changes).
 * @param {HTMLElement | null | undefined} root
 */
export function scheduleA11yScan(root) {
  pendingRoot = root ?? pendingRoot
  if (!pendingRoot) return
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    void runA11yScanAndReport(pendingRoot)
  }, AUTO_SCAN_DELAY_MS)
}

/**
 * Triggered inside the preview iframe (same document as the component).
 * @param {HTMLElement | null | undefined} root
 */
export async function runA11yScanAndReport(root) {
  if (!root) return

  scanGeneration += 1
  const generation = scanGeneration
  notifyScanStart()

  try {
    const results = await runA11yScan(root)
    if (generation !== scanGeneration) return
    setLastAxeResults(results)
    window.parent.postMessage(
      { type: A11Y_RESULT, results: serializeAxeResults(results) },
      window.location.origin
    )
  } catch (err) {
    if (generation !== scanGeneration) return
    setLastAxeResults(null)
    const message =
      err instanceof Error ? err.message : 'Accessibility scan failed.'
    window.parent.postMessage(
      { type: A11Y_RESULT, error: message },
      window.location.origin
    )
  }
}
