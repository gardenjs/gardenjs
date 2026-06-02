export function isA11yDisabled(a11y) {
  return a11y?.disable === true
}

export function a11yForAxe(a11y) {
  if (!a11y || isA11yDisabled(a11y)) return undefined
  const axeSettings = { ...a11y }
  delete axeSettings.disable
  return axeSettings
}
