/** @type {import('axe-core').AxeResults | null} */
let lastAxeResults = null

/** @returns {import('axe-core').AxeResults | null} */
export function getLastAxeResults() {
  return lastAxeResults
}

/** @param {import('axe-core').AxeResults | null} results */
export function setLastAxeResults(results) {
  lastAxeResults = results
}
