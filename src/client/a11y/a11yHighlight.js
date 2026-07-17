import { loadAxe } from './a11yScan.js'

const HIGHLIGHT_CLASS = 'garden-a11y-highlight'
const STYLE_ID = 'garden-a11y-highlight-style'
const HIGHLIGHT_SECTIONS = ['violations', 'incomplete', 'passes']

const SECTION_STYLES = {
  violations: {
    border: 'hsl(5, 95%, 50%)',
    background: 'hsla(5, 95%, 50%, 0.2)',
  },
  incomplete: {
    border: 'hsl(43, 91%, 45%)',
    background: 'hsla(43, 91%, 45%, 0.2)',
  },
  passes: {
    border: 'hsl(98, 50%, 47%)',
    background: 'hsla(98, 50%, 47%, 0.2)',
  },
}

let highlightedElements = []
let highlightGeneration = 0

function sectionModifierClass(section) {
  return `${HIGHLIGHT_CLASS}--${section}`
}

function ensureHighlightStyles() {
  if (document.getElementById(STYLE_ID)) return
  const rules = `
    .${HIGHLIGHT_CLASS} {
      scroll-margin: 40px;
    }
    ${HIGHLIGHT_SECTIONS.map((section) => {
      const { border, background } = SECTION_STYLES[section]
      return `
    .${sectionModifierClass(section)} {
      outline: 1px solid ${border} !important;
      outline-offset: 0px !important;
      background-color: ${background} !important;
    }`
    }).join('')}
  `

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = rules
  document.head.appendChild(style)
}

function targetToStrings(target) {
  if (!Array.isArray(target)) return []
  return target.filter((t) => typeof t === 'string')
}

function queryElement(query) {
  try {
    return query()
  } catch {
    return null
  }
}

function resolveTarget(axe, target, roots) {
  if (!Array.isArray(target) || target.length === 0) return null

  const targetStrings = targetToStrings(target)

  for (const root of roots) {
    if (axe.utils?.select) {
      const el = queryElement(() => axe.utils.select(target, root))
      if (el) return el
    }

    const joined = targetStrings.filter(Boolean).join(' ')
    if (joined) {
      const el = queryElement(() => root.querySelector(joined))
      if (el) return el
    }

    const last = targetStrings[targetStrings.length - 1]
    if (last) {
      const el = queryElement(() => root.querySelector(last))
      if (el) return el
    }
  }
  return null
}

function highlightSearchRoots(root) {
  const appRoot =
    (root instanceof HTMLElement && root.isConnected ? root : null) ??
    document.getElementById('garden_app')
  const roots = []
  if (appRoot) roots.push(appRoot)
  if (document.body && !roots.includes(document.body)) roots.push(document.body)
  return roots.length ? roots : [document.body]
}

export function clearA11yHighlights() {
  for (const el of highlightedElements) {
    el.classList.remove(HIGHLIGHT_CLASS)
    for (const section of HIGHLIGHT_SECTIONS) {
      el.classList.remove(sectionModifierClass(section))
    }
  }
  highlightedElements = []
}

function applyHighlights(elements, section) {
  clearA11yHighlights()
  if (!elements.length || !SECTION_STYLES[section]) return

  ensureHighlightStyles()
  const modifier = sectionModifierClass(section)
  let first = null

  for (const el of elements) {
    el.classList.add(HIGHLIGHT_CLASS, modifier)
    highlightedElements.push(el)
    if (!first) first = el
  }

  if (first) {
    requestAnimationFrame(() => {
      first.scrollIntoView({ block: 'start', behavior: 'smooth' })
    })
  }
}

function normalizeTargets(targets) {
  if (!Array.isArray(targets)) return []
  return targets.filter((target) => Array.isArray(target) && target.length > 0)
}

export async function highlightA11yTargets(section, root, targets) {
  const normalizedTargets = normalizeTargets(targets)
  const generation = ++highlightGeneration

  if (!normalizedTargets.length) {
    clearA11yHighlights()
    return
  }

  const roots = highlightSearchRoots(root)
  const axe = await loadAxe()
  if (generation !== highlightGeneration) return

  const elements = []
  const seen = new Set()

  for (const target of normalizedTargets) {
    const resolved = resolveTarget(axe, target, roots)
    if (!(resolved instanceof HTMLElement) || seen.has(resolved)) continue
    seen.add(resolved)
    elements.push(resolved)
  }

  if (generation !== highlightGeneration) return
  applyHighlights(elements, section)
}
