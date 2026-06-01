import { loadAxe } from './loadAxe.js'

/**
 * Run axe in the **current** document (preview iframe).
 * @param {ParentNode | null | undefined} root
 * @returns {Promise<import('axe-core').AxeResults>}
 */
export async function runA11yScan(root) {
  const axe = await loadAxe()
  const context = root ?? document.body

  return axe.run(context, {
    runOnly: ['wcag2a', 'wcag2aa', 'best-practice'],
  })
}
