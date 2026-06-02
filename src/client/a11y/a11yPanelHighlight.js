export function initialHighlightState() {
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

export function pickDefaultSection(results) {
  if (!results) return 'violations'
  if ((results.violations?.length ?? 0) > 0) return 'violations'
  if ((results.incomplete?.length ?? 0) > 0) return 'incomplete'
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

export function getHighlightTargets(
  rule,
  highlightScope,
  highlightIncludedIndices,
  highlightExcludedIndices
) {
  if (highlightScope === 'include') {
    return highlightIncludedIndices
      .map((index) => rule.nodes[index]?.target)
      .filter((target) => Array.isArray(target) && target.length > 0)
  }
  const excluded = new Set(highlightExcludedIndices)
  return rule.nodes
    .filter((_, index) => !excluded.has(index))
    .map((node) => node.target)
    .filter((target) => Array.isArray(target) && target.length > 0)
}

export function isNodeHighlightChecked(
  ruleId,
  index,
  highlightRuleId,
  highlightScope,
  highlightIncludedIndices,
  highlightExcludedIndices
) {
  if (highlightRuleId !== ruleId) return false
  if (highlightScope === 'include') {
    return highlightIncludedIndices.includes(index)
  }
  return !highlightExcludedIndices.includes(index)
}

export function isRuleHighlightPartial(
  ruleId,
  highlightRuleId,
  highlightScope,
  highlightExcludedIndices
) {
  return (
    highlightRuleId === ruleId &&
    highlightScope === 'all' &&
    highlightExcludedIndices.length > 0
  )
}

export function reduceNodeToggle(input) {
  const {
    rule,
    index,
    checked,
    highlightRuleId,
    highlightScope,
    highlightExcludedIndices,
    highlightIncludedIndices,
  } = input

  if (highlightRuleId !== rule.id) {
    if (!checked) return { action: 'none' }
    return {
      action: 'apply',
      highlightRuleId: rule.id,
      highlightScope: 'include',
      highlightExcludedIndices: [],
      highlightIncludedIndices: [index],
    }
  }

  if (highlightScope === 'all') {
    const excluded = [...highlightExcludedIndices]
    if (!checked) {
      if (!excluded.includes(index)) excluded.push(index)
    } else {
      const i = excluded.indexOf(index)
      if (i !== -1) excluded.splice(i, 1)
    }
    return {
      action: 'apply',
      highlightRuleId: rule.id,
      highlightScope: 'all',
      highlightExcludedIndices: excluded,
      highlightIncludedIndices: [],
    }
  }

  if (checked) {
    if (highlightIncludedIndices.includes(index)) return { action: 'none' }
    const included = [...highlightIncludedIndices, index].sort((a, b) => a - b)
    if (included.length === rule.nodes.length) {
      return {
        action: 'apply',
        highlightRuleId: rule.id,
        highlightScope: 'all',
        highlightExcludedIndices: [],
        highlightIncludedIndices: [],
      }
    }
    return {
      action: 'apply',
      highlightRuleId: rule.id,
      highlightScope: 'include',
      highlightExcludedIndices: [],
      highlightIncludedIndices: included,
    }
  }

  const included = highlightIncludedIndices.filter((i) => i !== index)
  if (included.length === 0) {
    return { action: 'clear' }
  }
  return {
    action: 'apply',
    highlightRuleId: rule.id,
    highlightScope: 'include',
    highlightExcludedIndices: [],
    highlightIncludedIndices: included,
  }
}
