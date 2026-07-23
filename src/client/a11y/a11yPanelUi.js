export function emptyHighlight() {
  return {
    highlightRuleId: null,
    highlightScope: null,
    highlightExcludedIndices: [],
    highlightIncludedIndices: [],
  }
}

export function impactLabel(impact, section) {
  if (section === 'passes') return null
  if (!impact) return 'Issue'
  return impact.charAt(0).toUpperCase() + impact.slice(1)
}

export function pickDefaultSection(scanResults) {
  if (!scanResults) return 'violations'
  if ((scanResults.violations?.length ?? 0) > 0) return 'violations'
  if ((scanResults.incomplete?.length ?? 0) > 0) return 'incomplete'
  return 'passes'
}

export function displayRuleTags(tags) {
  if (!tags?.length) return []
  const visible = tags.filter(
    (tag) => tag.startsWith('cat.') || tag.startsWith('wcag')
  )
  return [...visible].sort((a, b) => {
    const rank = (tag) => (tag.startsWith('cat.') ? 0 : 1)
    const diff = rank(a) - rank(b)
    return diff !== 0 ? diff : a.localeCompare(b)
  })
}

export function getHighlightTargets(rule, state) {
  if (state.highlightScope === 'include') {
    return state.highlightIncludedIndices
      .map((index) => rule.nodes[index]?.target)
      .filter((target) => Array.isArray(target) && target.length > 0)
  }
  const excluded = new Set(state.highlightExcludedIndices)
  return rule.nodes
    .filter((_, index) => !excluded.has(index))
    .map((node) => node.target)
    .filter((target) => Array.isArray(target) && target.length > 0)
}

export function isNodeHighlightChecked(ruleId, index, state) {
  if (state.highlightRuleId !== ruleId) return false
  if (state.highlightScope === 'include') {
    return state.highlightIncludedIndices.includes(index)
  }
  return !state.highlightExcludedIndices.includes(index)
}

export function isRuleHighlightPartial(ruleId, state) {
  return (
    state.highlightRuleId === ruleId &&
    state.highlightScope === 'all' &&
    state.highlightExcludedIndices.length > 0
  )
}

export function selectAllHighlight(ruleId) {
  return {
    highlightRuleId: ruleId,
    highlightScope: 'all',
    highlightExcludedIndices: [],
    highlightIncludedIndices: [],
  }
}

export function nextRuleHighlight(rule, checked, current) {
  if (!checked) {
    if (current.highlightRuleId === rule.id) return emptyHighlight()
    return current
  }
  return selectAllHighlight(rule.id)
}

export function nextNodeHighlight(rule, index, checked, current) {
  if (current.highlightRuleId !== rule.id) {
    if (!checked) return current
    return {
      highlightRuleId: rule.id,
      highlightScope: 'include',
      highlightExcludedIndices: [],
      highlightIncludedIndices: [index],
    }
  }

  if (current.highlightScope === 'all') {
    const excluded = [...current.highlightExcludedIndices]
    if (!checked) {
      if (!excluded.includes(index)) excluded.push(index)
    } else {
      const i = excluded.indexOf(index)
      if (i !== -1) excluded.splice(i, 1)
    }
    return {
      highlightRuleId: rule.id,
      highlightScope: 'all',
      highlightExcludedIndices: excluded,
      highlightIncludedIndices: [],
    }
  }

  if (checked) {
    if (current.highlightIncludedIndices.includes(index)) return current
    const included = [...current.highlightIncludedIndices, index].sort(
      (a, b) => a - b
    )
    if (included.length === rule.nodes.length) {
      return selectAllHighlight(rule.id)
    }
    return {
      highlightRuleId: rule.id,
      highlightScope: 'include',
      highlightExcludedIndices: [],
      highlightIncludedIndices: included,
    }
  }

  const included = current.highlightIncludedIndices.filter((i) => i !== index)
  if (included.length === 0) return emptyHighlight()
  return {
    highlightRuleId: rule.id,
    highlightScope: 'include',
    highlightExcludedIndices: [],
    highlightIncludedIndices: included,
  }
}
