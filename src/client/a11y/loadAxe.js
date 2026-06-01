/** @returns {Promise<import('axe-core').Axe>} */
export async function loadAxe() {
  await import('axe-core')
  const axe = globalThis.axe
  if (!axe?.run) {
    throw new Error('axe-core could not be loaded')
  }
  return axe
}
