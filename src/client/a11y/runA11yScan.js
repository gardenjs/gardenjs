import { a11yForAxe } from './a11yConfig.js'
import { loadAxe } from './loadAxe.js'
import { resolveA11ySettings } from './resolveA11ySettings.js'

export async function runA11yScan(a11y) {
  const axe = await loadAxe()
  const { axeConfig, runOptions, context } = resolveA11ySettings(
    a11yForAxe(a11y)
  )

  axe.configure(axeConfig)
  return axe.run(context, runOptions)
}
