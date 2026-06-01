<script>
  let {
    a11yState = { scanning: false, results: null, error: null },
    onHighlightA11yRule = () => {},
    onClearA11yHighlight = () => {},
  } = $props()

  let activeSection = $state('violations')
  let expandedRuleId = $state(null)
  let highlightedRuleId = $state(null)

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

  function toggleRule(id) {
    expandedRuleId = expandedRuleId === id ? null : id
  }

  function clearHighlight() {
    highlightedRuleId = null
    onClearA11yHighlight()
  }

  /** @param {{ id: string, nodes: { target: string[] }[] }} rule */
  function toggleRuleHighlight(rule, checked) {
    if (!checked) {
      clearHighlight()
      return
    }
    highlightedRuleId = rule.id
    onHighlightA11yRule(activeSection, rule.id)
  }

  function impactLabel(impact, section) {
    if (section === 'passes') return null
    if (!impact) return 'Issue'
    return impact.charAt(0).toUpperCase() + impact.slice(1)
  }

  /** @param {typeof results} results */
  function pickDefaultSection(results) {
    if (!results) return 'violations'
    if ((results.violations?.length ?? 0) > 0) return 'violations'
    if ((results.incomplete?.length ?? 0) > 0) return 'incomplete'
    return 'passes'
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
  {#if results}
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
    <div class="panel_body">
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
                      stroke-linejoin="round"><path d="M18 15l-6-6-6 6" /></svg
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
                  <span class="rule_title">{rule.help}</span>
                </button>
                <div class="rule_actions">
                  <span class="rule_count">{rule.nodes.length}</span>
                  <label class="rule_highlight" title="Highlight in preview">
                    <input
                      type="checkbox"
                      class="checkbox"
                      checked={highlightedRuleId === rule.id}
                      onchange={(e) =>
                        toggleRuleHighlight(rule, e.currentTarget.checked)}
                    />
                    <span class="visually_hidden">Highlight in preview</span>
                  </label>
                </div>
              </div>
              {#if expandedRuleId === rule.id}
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
                      <li>
                        <code>{node.target.join(' ')}</code>
                        {#if node.failureSummary}
                          <p class="failure_summary">{node.failureSummary}</p>
                        {/if}
                      </li>
                    {/each}
                  </ul>
                </div>
              {/if}
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  {/if}
</div>

<style lang="scss">
  @use './controls/checkbox.scss';

  .panel_a11y {
    display: flex;
    flex-direction: column;
    height: 100%;
    font-size: 0.825rem;
    line-height: 1.5;
    color: var(--c-basic-800);
  }
  .nav {
    --h-nav: 2.5rem;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    height: var(--h-nav);
    background-color: var(--c-basic-0);
  }
  .panel_divider {
    flex-shrink: 0;
    border-top: 1px solid var(--c-basic-200);
  }
  .panel_body {
    flex: 1;
    max-width: 900px;
    min-height: 0;
    overflow-y: auto;
    padding: 0 0 1.25rem;
  }
  .nav_btn {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 1.25rem 0.25rem;
    height: var(--h-nav);
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
    color: hsl(5, 95%, 60%);
    &:hover,
    &:focus-visible {
      color: hsl(5, 95%, 40%);
    }
  }
  .nav_btn--incomplete {
    color: hsl(43, 91%, 45%);
    &:hover,
    &:focus-visible {
      color: hsl(43, 91%, 40%);
    }
  }
  .nav_btn--passes {
    color: hsl(98, 50%, 47%);
    &:hover,
    &:focus-visible {
      color: hsl(98, 50%, 40%);
    }
  }
  .infotext {
    padding: 0 1.25rem;
  }
  .rules {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .rule {
    border-bottom: 1px solid var(--c-basic-200);
    overflow: hidden;
  }
  .rule_header {
    display: flex;
    align-items: center;
  }
  .rule_header:hover .rule_summary,
  .rule_header:focus-within .rule_summary,
  .rule_header:hover .rule_actions,
  .rule_header:focus-within .rule_actions {
    background-color: var(--c-primary-bg);
  }
  .rule_summary {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
    min-width: 0;
    padding: 0.5rem 0.5rem 0.5rem 1.25rem;
    border: 0;
    background: none;
    text-align: left;
    cursor: pointer;
  }
  .rule_summary:hover,
  .rule_summary:focus-visible {
    background-color: var(--c-primary-bg);
  }
  .rule_arrow {
    display: flex;
    align-items: center;
    flex-shrink: 0;
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
  .rule_title {
    flex: 1;
    min-width: 0;
    color: var(--c-basic-600);
    font-weight: 600;
  }
  .rule_actions {
    --rule-control-size: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
    padding: 0.5rem 1.25rem 0.5rem 0;
  }
  .rule_count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    min-width: var(--rule-control-size);
    height: var(--rule-control-size);
    padding: 0 0.2rem;
    border-radius: 50%;
    background-color: var(--c-primary);
    color: var(--c-basic-0);
    font-size: 0.6875rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    line-height: 1;
  }
  .rule_highlight {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--rule-control-size);
    height: var(--rule-control-size);
    margin: 0;
    cursor: pointer;

    input[type='checkbox'].checkbox {
      margin: 0;
      vertical-align: middle;
    }
  }
  .visually_hidden {
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
    padding: 0.625rem 1.25rem 0.75rem;
    background: var(--c-basic-0);
  }
  .rule_detail p {
    margin: 0 0 0.5rem;
  }
  .rule_detail a {
    color: var(--c-primary);
  }
  .rule_nodes {
    margin: 0.75rem 0 0;
    padding: 0;
    list-style: none;
  }
  .rule_nodes li + li {
    margin-top: 0.625rem;
    padding-top: 0.625rem;
    border-top: 1px solid var(--c-basic-150);
  }
  .rule_nodes code {
    display: block;
    margin-bottom: 0.25rem;
    padding: 0.25rem 0.375rem;
    background: var(--c-basic-100);
    font-family: monospace;
    font-size: 0.75rem;
    word-break: break-all;
  }
  .rule_nodes p {
    margin: 0.5rem 0 0;
  }
  .failure_summary {
    white-space: pre-wrap;
  }
</style>
