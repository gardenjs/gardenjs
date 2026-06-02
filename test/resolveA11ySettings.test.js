import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { a11yForAxe, isA11yDisabled } from '../src/client/a11y/a11yConfig.js'
import { resolveA11ySettings } from '../src/client/a11y/resolveA11ySettings.js'

function regionDisabledInConfig(axeConfig) {
  const region = axeConfig.rules?.find((r) => r.id === 'region')
  assert.equal(region?.enabled, false)
}

describe('a11yConfig', () => {
  it('treats disable true as off', () => {
    assert.equal(isA11yDisabled({ disable: true }), true)
    assert.equal(
      a11yForAxe({ disable: true, options: { xpath: true } }),
      undefined
    )
  })

  it('strips disable before axe settings', () => {
    assert.equal(isA11yDisabled({ disable: false }), false)
    assert.deepEqual(a11yForAxe({ disable: false, options: { xpath: true } }), {
      options: { xpath: true },
    })
  })
})

describe('resolveA11ySettings', () => {
  it('uses core defaults when input is omitted', () => {
    const { axeConfig, runOptions, context } = resolveA11ySettings()
    regionDisabledInConfig(axeConfig)
    assert.deepEqual(runOptions, {})
    assert.equal(context.include, 'body')
    assert.equal(context.exclude, undefined)
  })

  it('uses core defaults for empty a11y object', () => {
    const { axeConfig, runOptions } = resolveA11ySettings({})
    regionDisabledInConfig(axeConfig)
    assert.deepEqual(runOptions, {})
  })

  it('merges project config and keeps region disabled by default', () => {
    const { axeConfig } = resolveA11ySettings({
      config: {
        branding: { brand: 'Test' },
        rules: [{ id: 'duplicate-id', enabled: false }],
      },
    })
    regionDisabledInConfig(axeConfig)
    assert.equal(axeConfig.branding.brand, 'Test')
    const duplicate = axeConfig.rules.find((r) => r.id === 'duplicate-id')
    assert.equal(duplicate?.enabled, false)
  })

  it('allows re-enabling region via later config rule', () => {
    const { axeConfig } = resolveA11ySettings({
      config: {
        rules: [{ id: 'region', enabled: true }],
      },
    })
    const region = axeConfig.rules.filter((r) => r.id === 'region')
    assert.ok(region.some((r) => r.enabled === false))
    assert.ok(region.some((r) => r.enabled === true))
  })

  it('uses string context as include', () => {
    const { context } = resolveA11ySettings({
      context: '#garden_app',
    })
    assert.equal(context.include, '#garden_app')
  })

  it('merges object context include and exclude', () => {
    const { context } = resolveA11ySettings({
      context: {
        include: 'body',
        exclude: ['[data-a11y-ignore]'],
      },
    })
    assert.equal(context.include, 'body')
    assert.deepEqual(context.exclude, ['[data-a11y-ignore]'])
  })

  it('appends exclude without replacing default include', () => {
    const { context } = resolveA11ySettings({
      context: { exclude: ['.skip'] },
    })
    assert.equal(context.include, 'body')
    assert.deepEqual(context.exclude, ['.skip'])
  })

  it('passes run options through when runOnly is not set', () => {
    const { runOptions } = resolveA11ySettings({
      options: { xpath: true },
    })
    assert.deepEqual(runOptions, { xpath: true })
  })

  it('mirrors configured disables into run options when runOnly is set', () => {
    const { runOptions } = resolveA11ySettings({
      config: { rules: [{ id: 'duplicate-id', enabled: false }] },
      options: {
        runOnly: { type: 'tag', values: ['wcag2aa'] },
        rules: { 'color-contrast': { enabled: true } },
      },
    })
    assert.equal(runOptions.runOnly.type, 'tag')
    assert.equal(runOptions.rules.region.enabled, false)
    assert.equal(runOptions.rules['duplicate-id'].enabled, false)
    assert.equal(runOptions.rules['color-contrast'].enabled, true)
  })
})
