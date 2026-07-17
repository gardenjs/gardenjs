<script>
  let {
    a11yState = { scanning: false, results: null, error: null },
    onHighlightA11yRule = () => {},
    onClearA11yHighlight = () => {},
  } = $props()

  let activeSection = $state('violations')
  let expandedRuleId = $state(null)
  let highlight = $state(emptyHighlight())

  const results = $derived(a11yState.results)
  const violationCount = $derived(results?.violations?.length ?? 0)
  const incompleteCount = $derived(results?.incomplete?.length ?? 0)
  const passCount = $derived(results?.passes?.length ?? 0)

  const sections = $derived([
    {
      id: 'violations',
      label: violationCount === 1 ? 'Violation' : 'Violations',
      count: violationCount,
    },
    { id: 'incomplete', label: 'Incomplete', count: incompleteCount },
    { id: 'passes', label: 'Passed', count: passCount },
  ])

  const activeRules = $derived.by(() => {
    if (!results) return []
    if (activeSection === 'violations') return results.violations
    if (activeSection === 'incomplete') return results.incomplete
    return results.passes
  })

  function emptyHighlight() {
    return {
      highlightRuleId: null,
      highlightScope: null,
      highlightExcludedIndices: [],
      highlightIncludedIndices: [],
    }
  }

  function impactLabel(impact, section) {
    if (section === 'passes') return null
    if (!impact) return 'Issue'
    return impact.charAt(0).toUpperCase() + impact.slice(1)
  }

  function pickDefaultSection(scanResults) {
    if (!scanResults) return 'violations'
    if ((scanResults.violations?.length ?? 0) > 0) return 'violations'
    if ((scanResults.incomplete?.length ?? 0) > 0) return 'incomplete'
    return 'passes'
  }

  function displayRuleTags(tags) {
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

  function getHighlightTargets(rule, state) {
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

  function isNodeHighlightChecked(ruleId, index, state) {
    if (state.highlightRuleId !== ruleId) return false
    if (state.highlightScope === 'include') {
      return state.highlightIncludedIndices.includes(index)
    }
    return !state.highlightExcludedIndices.includes(index)
  }

  function isRuleHighlightPartial(ruleId, state) {
    return (
      state.highlightRuleId === ruleId &&
      state.highlightScope === 'all' &&
      state.highlightExcludedIndices.length > 0
    )
  }

  function toggleRule(id) {
    expandedRuleId = expandedRuleId === id ? null : id
  }

  function clearHighlight() {
    highlight = emptyHighlight()
    onClearA11yHighlight()
  }

  function applyRuleHighlight(rule) {
    const targets = getHighlightTargets(rule, highlight)
    if (!targets.length) {
      clearHighlight()
      return
    }
    onHighlightA11yRule(activeSection, targets)
  }

  function selectAllNodesHighlight(rule) {
    highlight = {
      highlightRuleId: rule.id,
      highlightScope: 'all',
      highlightExcludedIndices: [],
      highlightIncludedIndices: [],
    }
    onHighlightA11yRule(activeSection, getHighlightTargets(rule, highlight))
  }

  function toggleRuleHighlight(rule, checked) {
    if (!checked) {
      if (highlight.highlightRuleId === rule.id) clearHighlight()
      return
    }
    selectAllNodesHighlight(rule)
  }

  function toggleNodeHighlight(rule, index, checked) {
    if (highlight.highlightRuleId !== rule.id) {
      if (!checked) return
      highlight = {
        highlightRuleId: rule.id,
        highlightScope: 'include',
        highlightExcludedIndices: [],
        highlightIncludedIndices: [index],
      }
      applyRuleHighlight(rule)
      return
    }

    if (highlight.highlightScope === 'all') {
      const excluded = [...highlight.highlightExcludedIndices]
      if (!checked) {
        if (!excluded.includes(index)) excluded.push(index)
      } else {
        const i = excluded.indexOf(index)
        if (i !== -1) excluded.splice(i, 1)
      }
      highlight = {
        highlightRuleId: rule.id,
        highlightScope: 'all',
        highlightExcludedIndices: excluded,
        highlightIncludedIndices: [],
      }
      applyRuleHighlight(rule)
      return
    }

    if (checked) {
      if (highlight.highlightIncludedIndices.includes(index)) return
      const included = [...highlight.highlightIncludedIndices, index].sort(
        (a, b) => a - b
      )
      if (included.length === rule.nodes.length) {
        selectAllNodesHighlight(rule)
        return
      }
      highlight = {
        highlightRuleId: rule.id,
        highlightScope: 'include',
        highlightExcludedIndices: [],
        highlightIncludedIndices: included,
      }
      applyRuleHighlight(rule)
      return
    }

    const included = highlight.highlightIncludedIndices.filter(
      (i) => i !== index
    )
    if (included.length === 0) {
      clearHighlight()
      return
    }
    highlight = {
      highlightRuleId: rule.id,
      highlightScope: 'include',
      highlightExcludedIndices: [],
      highlightIncludedIndices: included,
    }
    applyRuleHighlight(rule)
  }

  $effect(() => {
    if (results) {
      activeSection = pickDefaultSection(results)
      expandedRuleId = null
      clearHighlight()
    }
  })
</script>

<div class="panel_a11y">
  {#if a11yState.scanning && !results}
    <p class="infotext">Scanning…</p>
  {:else if a11yState.error && !results}
    <p class="infotext errortext">{a11yState.error}</p>
  {:else if results}
    <div class="panel_head">
      <nav class="nav" aria-label="Result categories">
        {#each sections as section (section.id)}
          <button
            type="button"
            class="nav_btn"
            class:nav_btn--active={activeSection === section.id}
            class:nav_btn--violations={section.id === 'violations'}
            class:nav_btn--incomplete={section.id === 'incomplete'}
            class:nav_btn--passes={section.id === 'passes'}
            onclick={() => {
              activeSection = section.id
              expandedRuleId = null
              clearHighlight()
            }}
          >
            {section.count}
            {section.label}
            <span class="dot"></span>
          </button>
        {/each}
      </nav>
      <div class="panel_divider" aria-hidden="true"></div>
    </div>
    <div class="panel_body">
      <div class="panel_body_content">
        {#if activeRules.length === 0}
          <p class="infotext">No entries in this category.</p>
        {:else}
          <ul class="rules">
            {#each activeRules as rule (rule.id)}
              <li class="rule">
                <div class="rule_header">
                  <button
                    type="button"
                    class="rule_summary"
                    aria-expanded={expandedRuleId === rule.id}
                    onclick={() => toggleRule(rule.id)}
                  >
                    <span
                      class="rule_arrow"
                      class:unfolded_icon={expandedRuleId === rule.id}
                      aria-hidden="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        viewBox="0 0 24 24"
                        height="12"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        ><path d="M18 15l-6-6-6 6" /></svg
                      >
                    </span>
                    {#if impactLabel(rule.impact, activeSection)}
                      <span
                        class="impact"
                        class:impact-critical={activeSection === 'violations' &&
                          rule.impact === 'critical'}
                        class:impact-serious={activeSection === 'violations' &&
                          rule.impact === 'serious'}
                        class:impact-moderate={activeSection === 'violations' &&
                          rule.impact === 'moderate'}
                        class:impact-minor={activeSection === 'violations' &&
                          rule.impact === 'minor'}
                        class:impact-issue={activeSection !== 'passes' &&
                          !rule.impact}
                      >
                        {impactLabel(rule.impact, activeSection)}
                      </span>
                    {/if}
                    <span class="rule_heading">
                      <span class="rule_title">{rule.help}</span>
                      <span class="rule_count">{rule.nodes.length}</span>
                    </span>
                  </button>
                  <div class="rule_actions">
                    <label
                      class="rule_highlight"
                      title="Highlight all elements in preview"
                    >
                      <input
                        type="checkbox"
                        class="checkbox"
                        class:checkbox--excluded={isRuleHighlightPartial(
                          rule.id,
                          highlight
                        )}
                        checked={highlight.highlightRuleId === rule.id &&
                          highlight.highlightScope === 'all' &&
                          highlight.highlightExcludedIndices.length === 0}
                        aria-checked={isRuleHighlightPartial(rule.id, highlight)
                          ? 'mixed'
                          : highlight.highlightRuleId === rule.id &&
                            highlight.highlightScope === 'all' &&
                            highlight.highlightExcludedIndices.length === 0}
                        onchange={(e) =>
                          toggleRuleHighlight(rule, e.currentTarget.checked)}
                      />
                      <span class="is-hidden">Highlight all in preview</span>
                    </label>
                  </div>
                </div>
                {#if expandedRuleId === rule.id}
                  {@const visibleTags = displayRuleTags(rule.tags)}
                  <div class="rule_detail">
                    <p>{rule.description}</p>
                    {#if rule.helpUrl}
                      <a
                        href={rule.helpUrl}
                        target="_blank"
                        rel="noopener noreferrer">How to fix</a
                      >
                    {/if}
                    <ul class="rule_nodes">
                      {#each rule.nodes as node, index (`${rule.id}-${index}`)}
                        <li class="rule_node">
                          <div class="rule_node_body">
                            <code>{node.target.join(' ')}</code>
                            {#if node.failureSummary}
                              <p class="failure_summary">
                                {node.failureSummary}
                              </p>
                            {/if}
                          </div>
                          {#if rule.nodes.length > 1}
                            <label
                              class="node_highlight"
                              title="Highlight this element in preview"
                            >
                              <input
                                type="checkbox"
                                class="checkbox"
                                checked={isNodeHighlightChecked(
                                  rule.id,
                                  index,
                                  highlight
                                )}
                                onchange={(e) =>
                                  toggleNodeHighlight(
                                    rule,
                                    index,
                                    e.currentTarget.checked
                                  )}
                              />
                              <span class="is-hidden">Highlight in preview</span
                              >
                            </label>
                          {/if}
                        </li>
                      {/each}
                    </ul>
                    {#if visibleTags.length}
                      <ul class="rule_tags" aria-label="Rule tags">
                        {#each visibleTags as tag (tag)}
                          <li>
                            <span class="rule_tag">{tag}</span>
                          </li>
                        {/each}
                      </ul>
                    {/if}
                  </div>
                {/if}
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  @use './controls/checkbox.scss';

  .panel_a11y {
    --a11y-violations: hsl(5, 95%, 60%);
    --a11y-violations-hover: hsl(5, 95%, 40%);
    --a11y-incomplete: hsl(43, 91%, 45%);
    --a11y-incomplete-hover: hsl(43, 91%, 40%);
    --a11y-passes: hsl(98, 50%, 47%);
    --a11y-passes-hover: hsl(98, 50%, 40%);
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
    overflow: hidden;
    font-size: 0.825rem;
    line-height: 1.5;
    color: var(--c-basic-800);
  }
  .panel_head {
    flex-shrink: 0;
    background-color: var(--c-basic-0);
  }
  .nav {
    display: flex;
    align-items: center;
    height: 2.5rem;
    background-color: var(--c-basic-0);
  }
  .panel_divider {
    border-top: 1px solid var(--c-basic-200);
  }
  .panel_body {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
  }
  .panel_body_content {
    max-width: 900px;
    padding: 0 0 1.25rem;
  }
  .nav_btn {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 1.25rem 0.25rem;
    height: 2.5rem;
    background: none;
    font-weight: 500;
    overflow: hidden;
  }
  .nav_btn:hover,
  .nav_btn:focus-visible {
    background-color: var(--c-primary-bg);
  }
  .nav_btn .dot {
    display: block;
    position: absolute;
    left: 50%;
    bottom: 0.375rem;
    transform: translateX(-50%);
    height: 0.313rem;
    width: 0.313rem;
    background-color: transparent;
    border-radius: 50%;
  }
  .nav_btn--active {
    background-color: var(--c-primary-bg);
  }
  .nav_btn--active .dot {
    background-color: var(--c-primary);
  }
  .nav_btn--violations {
    color: var(--a11y-violations);
    &:hover,
    &:focus-visible {
      color: var(--a11y-violations-hover);
    }
  }
  .nav_btn--incomplete {
    color: var(--a11y-incomplete);
    &:hover,
    &:focus-visible {
      color: var(--a11y-incomplete-hover);
    }
  }
  .nav_btn--passes {
    color: var(--a11y-passes);
    &:hover,
    &:focus-visible {
      color: var(--a11y-passes-hover);
    }
  }
  .infotext {
    padding: 0 1.25rem;
  }
  .errortext {
    color: var(--a11y-violations);
  }
  .rules {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .rule {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 1.75rem;
    column-gap: 0.5rem;
    border-bottom: 1px solid var(--c-basic-200);
    overflow: hidden;
  }
  .rule_header {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: subgrid;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: transparent;
      pointer-events: none;
      z-index: 0;
    }
    &:hover::before,
    &:focus-within::before {
      background-color: var(--c-primary-bg);
    }
  }
  .rule_summary {
    grid-column: 1;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
    padding: 0.5rem 0.5rem 0.5rem 1.25rem;
    border: 0;
    background: none;
    text-align: left;
    cursor: pointer;
  }
  .rule_arrow {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    width: 0.75rem;
    color: var(--c-basic-900);
    transition: 0.2s;
  }
  .rule_arrow.unfolded_icon {
    transform: rotate(180deg);
    transition: 0.2s;
  }
  .impact {
    flex-shrink: 0;
    padding: 0.125rem 0.375rem;
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    background: var(--c-basic-200);
    color: var(--c-basic-700);
  }
  .impact-critical {
    background: hsl(0, 75%, 92%);
    color: hsl(0, 65%, 32%);
  }
  .impact-serious {
    background: hsl(25, 90%, 92%);
    color: hsl(25, 70%, 32%);
  }
  .impact-moderate {
    background: hsl(45, 90%, 90%);
    color: hsl(40, 70%, 28%);
  }
  .impact-minor {
    background: hsl(200, 60%, 92%);
    color: hsl(200, 50%, 30%);
  }
  .impact-issue {
    background: hsl(0, 55%, 92%);
    color: hsl(0, 50%, 32%);
  }
  .rule_heading {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
    min-width: 0;
    justify-content: flex-start;
  }
  .rule_title {
    color: var(--c-basic-600);
    font-weight: 600;
  }
  .rule_actions {
    grid-column: 2;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    align-self: center;
    padding: 0.5rem 0.5rem 0.5rem 0;
    background: none;
  }
  .rule_count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    min-width: 1.25rem;
    height: 1.25rem;
    padding: 0 0.2rem;
    border-radius: 50%;
    background-color: var(--c-primary);
    color: var(--c-basic-0);
    font-size: 0.6875rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    line-height: 1;
  }
  .rule_highlight,
  .node_highlight {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    min-width: 1.25rem;
    height: 1.25rem;
    margin: 0;
    cursor: pointer;

    input[type='checkbox'].checkbox {
      flex-shrink: 0;
      width: 1.25rem;
      min-width: 1.25rem;
      height: 1.25rem;
      margin: 0;
      vertical-align: middle;
    }
  }
  .is-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  .rule_detail {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: subgrid;
    padding: 0.625rem 0 0.75rem;
    background: var(--c-basic-0);
  }
  .rule_detail > p,
  .rule_detail > a {
    grid-column: 1;
    padding-left: 2.5rem;
    padding-right: 0.5rem;
  }
  .rule_detail p {
    margin: 0 0 0.5rem;
  }
  .rule_detail a {
    color: var(--c-primary);
  }
  .rule_tags {
    grid-column: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    margin: 0.75rem 0 0;
    padding: 0 0.5rem 0 2.5rem;
    list-style: none;
  }
  .rule_tag {
    display: inline-block;
    padding: 0.125rem 0.375rem;
    border: 1px solid var(--c-basic-250);
    border-radius: 0.25rem;
    background: transparent;
    color: var(--c-basic-600);
    font-family: monospace;
    font-size: 0.6875rem;
    line-height: 1.4;
  }
  .rule_nodes {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: subgrid;
    margin: 0.75rem 0 0;
    padding: 0;
    list-style: none;
  }
  .rule_node {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: subgrid;
    align-items: start;
  }
  .rule_node + .rule_node {
    margin-top: 0.625rem;
    padding-top: 0.625rem;
    border-top: 1px solid var(--c-basic-150);
  }
  .rule_node_body {
    grid-column: 1;
    min-width: 0;
    padding-left: 2.5rem;
    padding-right: 0.5rem;
  }
  .node_highlight {
    grid-column: 2;
    justify-self: end;
    align-self: start;
    margin-right: 0.5rem;
    margin-top: calc(0.25rem + (0.75rem * 1.4) / 2 - 1.25rem / 2);
  }
  .rule_node_body code {
    display: block;
    margin-bottom: 0.25rem;
    padding: 0.25rem 0.375rem;
    background: var(--c-basic-100);
    font-family: monospace;
    font-size: 0.75rem;
    line-height: 1.4;
    word-break: break-all;
  }
  .rule_node_body p {
    margin: 0.5rem 0 0;
  }
</style>
