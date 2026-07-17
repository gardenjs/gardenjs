const GARDEN_DISABLED_AXE_RULE_IDS = ['region']

const DEFAULT_PARAMETERS = { config: {}, options: {} }

function getDisabledRulesFromConfig(rules = []) {
  const disabledRules = {}
  for (const rule of rules) {
    if (!rule?.id || typeof rule.enabled !== 'boolean') continue
    if (rule.enabled) {
      delete disabledRules[rule.id]
    } else {
      disabledRules[rule.id] = { enabled: false }
    }
  }
  return disabledRules
}

function mergeDisabledRulesIntoRunOptions(options, axeConfig) {
  if (!options.runOnly) return options

  const disabledRules = getDisabledRulesFromConfig(axeConfig.rules)
  if (Object.keys(disabledRules).length === 0) return options

  return {
    ...options,
    rules: {
      ...disabledRules,
      ...options.rules,
    },
  }
}

function buildAxeContext(userContext) {
  const context = {
    include: typeof document !== 'undefined' ? document.body : 'body',
  }

  if (!userContext) return context

  const isObject = typeof userContext === 'object' && userContext !== null
  const hasInclude =
    isObject && 'include' in userContext && userContext.include !== undefined
  const hasExclude =
    isObject && 'exclude' in userContext && userContext.exclude !== undefined

  if (hasInclude) {
    context.include = userContext.include
  } else if (!hasInclude && !hasExclude) {
    context.include = userContext
  }

  if (hasExclude) {
    const extra = userContext.exclude
    const base = context.exclude
    context.exclude = base ? [].concat(base, extra) : extra
  }

  return context
}

export function resolveA11ySettings(input) {
  const { config = {}, options = {} } = input ?? DEFAULT_PARAMETERS

  const axeConfig = {
    ...config,
    rules: [
      ...GARDEN_DISABLED_AXE_RULE_IDS.map((id) => ({ id, enabled: false })),
      ...(config.rules ?? []),
    ],
  }

  return {
    axeConfig,
    runOptions: mergeDisabledRulesIntoRunOptions(options, axeConfig),
    context: buildAxeContext(input?.context),
  }
}
