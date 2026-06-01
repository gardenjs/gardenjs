import { loadAxe } from './loadAxe.js'
import { getLastAxeResults } from './a11yScanCache.js'

const HIGHLIGHT_CLASS = 'garden-a11y-highlight'
const STYLE_ID = 'garden-a11y-highlight-style'

/** @type {readonly ('violations' | 'incomplete' | 'passes')[]} */
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

/** @type {HTMLElement[]} */
let highlightedElements = []

/** @param {'violations' | 'incomplete' | 'passes'} section */
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

/**
 * @param {import('axe-core').Axe} axe
 * @param {string[]} target
 * @param {ParentNode} root
 * @returns {Element | null}
 */
function resolveTarget(axe, target, root) {
  if (!target?.length) return null

  if (axe.utils?.select) {
    try {
      const el = axe.utils.select(target, root)
      if (el) return el
    } catch {
      /* axe select failed */
    }
  }

  const joined = target.filter(Boolean).join(' ')
  if (joined) {
    try {
      const el = root.querySelector(joined)
      if (el) return el
    } catch {
      /* invalid selector */
    }
  }

  const last = target[target.length - 1]
  if (last) {
    try {
      return root.querySelector(last)
    } catch {
      /* invalid selector */
    }
  }
  return null
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

/**
 * @param {HTMLElement[]} elements
 * @param {'violations' | 'incomplete' | 'passes'} section
 */
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

/**
 * Highlight a rule from the last axe run in this iframe (same document as the scan).
 * @param {'violations' | 'incomplete' | 'passes'} section
 * @param {string} ruleId
 * @param {HTMLElement | null | undefined} root
 */
export async function highlightA11yRule(section, ruleId, root) {
  const lastResults = getLastAxeResults()
  if (!lastResults) return

  const rules = lastResults[section] ?? []
  const rule = rules.find((r) => r.id === ruleId)
  if (!rule?.nodes?.length) return

  const scope = root ?? document.getElementById('garden_app') ?? document.body
  const axe = await loadAxe()
  /** @type {HTMLElement[]} */
  const elements = []

  for (const node of rule.nodes) {
    if (node.element instanceof HTMLElement && node.element.isConnected) {
      elements.push(node.element)
      continue
    }
    const el = resolveTarget(axe, node.target, scope)
    if (el instanceof HTMLElement) {
      elements.push(el)
    }
  }

  applyHighlights(elements, section)
}
