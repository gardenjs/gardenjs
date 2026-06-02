function failureSummaryText(html) {
  if (!html) return undefined
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|li)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function mapRules(rules) {
  return rules.map((rule) => ({
    id: rule.id,
    impact: rule.impact,
    help: rule.help,
    description: rule.description,
    helpUrl: rule.helpUrl,
    tags: rule.tags,
    nodes: (rule.nodes || []).map((node) => ({
      html: node.html,
      target: node.target,
      failureSummary: failureSummaryText(node.failureSummary),
    })),
  }))
}

export function serializeAxeResults(results) {
  return {
    url: results.url,
    timestamp: results.timestamp,
    violations: mapRules(results.violations),
    passes: mapRules(results.passes),
    incomplete: mapRules(results.incomplete),
  }
}
