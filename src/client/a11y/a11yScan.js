import { resolveA11ySettings } from './resolveA11ySettings.js'

export function isA11yDisabled(a11y) {
  return a11y?.disable === true
}

export function a11yForAxe(a11y) {
  if (!a11y || isA11yDisabled(a11y)) return undefined
  const axeSettings = { ...a11y }
  delete axeSettings.disable
  return axeSettings
}

export async function loadAxe() {
  await import('axe-core')
  const axe = globalThis.axe
  if (!axe?.run) {
    throw new Error('axe-core could not be loaded')
  }
  return axe
}

export async function runA11yScan(a11y) {
  const axe = await loadAxe()
  const { axeConfig, runOptions, context } = resolveA11ySettings(
    a11yForAxe(a11y)
  )

  axe.configure(axeConfig)
  return axe.run(context, runOptions)
}
