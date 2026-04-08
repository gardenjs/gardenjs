<script>
  import { SvelteSet } from 'svelte/reactivity'
  import ArrayControl from './controls/ArrayControl.svelte'
  import BooleanControl from './controls/BooleanControl.svelte'
  import ColorPickerControl from './controls/ColorPickerControl.svelte'
  import DateControl from './controls/DateControl.svelte'
  import DatetimeControl from './controls/DatetimeControl.svelte'
  import JsonControl from './controls/JsonControl.svelte'
  import MultiselectControl from './controls/MultiselectControl.svelte'
  import NumberControl from './controls/NumberControl.svelte'
  import ObjectControl from './controls/ObjectControl.svelte'
  import RangeControl from './controls/RangeControl.svelte'
  import SelectControl from './controls/SelectControl.svelte'
  import TextInputControl from './controls/TextInputControl.svelte'
  import TimeControl from './controls/TimeControl.svelte'

  let {
    params = [],
    values = {},
    valuesChanged = false,
    onChange,
    onReset,
  } = $props()

  const CONTROL_TYPES = [
    'checkbox',
    'number',
    'color',
    'date',
    'time',
    'datetime',
    'array',
    'object',
    'multiselect',
    'checkboxes',
    'toggle',
    'radio',
    'textarea',
    'text',
    'range',
    'select',
  ]

  const isValidControl = (control) =>
    CONTROL_TYPES.includes(control.toLowerCase())

  const getControlType = (param) => {
    if (param.control && isValidControl(param.control)) {
      return param.control.toLowerCase()
    }
    switch (param.type?.toLowerCase()) {
      case 'boolean':
        return 'checkbox'
      case 'number':
        return 'number'
      case 'date':
        return 'date'
      case 'array':
      case 'object':
        return 'json'
      case 'string':
      default:
        return 'text'
    }
  }

  let openDescriptionKeys = new SvelteSet()

  const paramsWithDescription = $derived(params.filter((p) => p.description))
  const allDescriptionKeys = $derived(paramsWithDescription.map((p) => p.name))
  const allDescriptionsOpen = $derived.by(() => {
    const keys = allDescriptionKeys
    if (keys.length === 0) return false
    void openDescriptionKeys.size
    return keys.every((k) => openDescriptionKeys.has(k))
  })

  function toggleDescription(name) {
    if (openDescriptionKeys.has(name)) openDescriptionKeys.delete(name)
    else openDescriptionKeys.add(name)
  }

  function toggleAllDescriptions() {
    if (allDescriptionsOpen) {
      allDescriptionKeys.forEach((k) => openDescriptionKeys.delete(k))
    } else {
      allDescriptionKeys.forEach((k) => openDescriptionKeys.add(k))
    }
  }
</script>

<div class="pane">
  <div class="header">
    <div class="title">Parameters</div>
    <div class="header-actions">
      {#if paramsWithDescription.length > 0}
        <button
          type="button"
          class="btn btn_descriptions"
          title={allDescriptionsOpen
            ? 'Collapse all descriptions'
            : 'Expand all descriptions'}
          aria-label={allDescriptionsOpen
            ? 'Collapse all descriptions'
            : 'Expand all descriptions'}
          onclick={toggleAllDescriptions}
        >
          {#if allDescriptionsOpen}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path
                d="M4 19.5v-15A2.5 2.5 0 016.5 2H19a1 1 0 011 1v18a1 1 0 01-1 1H6.5a1 1 0 010-5H20"
              />
            </svg>
          {:else}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path
                d="M12 7v14m-9-3a1 1 0 01-1-1V4a1 1 0 011-1h5a4 4 0 014 4 4 4 0 014-4h5a1 1 0 011 1v13a1 1 0 01-1 1h-6a3 3 0 00-3 3 3 3 0 00-3-3z"
              />
            </svg>
          {/if}
          <span class="btn-label"
            >{allDescriptionsOpen ? 'Descriptions' : 'Descriptions'}</span
          >
        </button>
      {/if}
      {#if valuesChanged}
        <button
          class="btn"
          title="Reset all parameters"
          aria-label="Reset all parameters"
          onclick={() => onReset?.()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          <span class="btn-label">Reset</span>
        </button>
      {/if}
    </div>
  </div>

  {#if params.length === 0}
    <div class="empty">No parameters defined.</div>
  {:else}
    <div class="grid">
      {#each params as param (param.name)}
        {@const controlType = getControlType(param)}
        <div class="label-cell">
          <div class="label-row">
            <span class="label">{param.label || param.name}</span>
            {#if param.description}
              <button
                type="button"
                class="info-btn"
                title={openDescriptionKeys.has(param.name)
                  ? 'Close description'
                  : 'Show description'}
                aria-label={openDescriptionKeys.has(param.name)
                  ? 'Close description'
                  : 'Show description'}
                aria-expanded={openDescriptionKeys.has(param.name)}
                onclick={() => toggleDescription(param.name)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  viewBox="0 0 24 24"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                  ><circle cx="12" cy="12" r="10" /><path
                    d="M12 16v-4m0-4h.01"
                  /></svg
                >
              </button>
            {/if}
          </div>
          {#if controlType === 'array' || controlType === 'object'}
            {@const paramValue = values?.[param.name]}
            {@const isParamUnset =
              paramValue === undefined || paramValue === null}
            <div class="label-cell-unset">
              {#if isParamUnset}
                <span class="unset-info">is not set</span>
              {:else}
                <button
                  type="button"
                  class="btn_unset"
                  title="Unset"
                  aria-label="Unset"
                  onclick={() => onChange?.(param.name, undefined)}
                >
                  <svg
                    class="close"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                  unset
                </button>
              {/if}
            </div>
          {/if}
        </div>
        <div class="input">
          {#if controlType === 'checkbox' || controlType === 'toggle'}
            <BooleanControl
              value={values?.[param.name] ?? undefined}
              control={controlType}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if controlType === 'number'}
            <NumberControl
              value={values?.[param.name] ?? null}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if controlType === 'color'}
            <ColorPickerControl
              value={values?.[param.name] ?? undefined}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if controlType === 'date'}
            <DateControl
              value={values?.[param.name] ?? undefined}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if controlType === 'time'}
            <TimeControl
              value={values?.[param.name] ?? undefined}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if controlType === 'datetime'}
            <DatetimeControl
              value={values?.[param.name] ?? undefined}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if controlType === 'array'}
            <ArrayControl
              value={values?.[param.name] ?? []}
              schema={param.schema ?? {}}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if controlType === 'object'}
            <ObjectControl
              value={values?.[param.name] ?? {}}
              schema={param.schema ?? {}}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if controlType === 'multiselect' || controlType === 'checkboxes'}
            <MultiselectControl
              value={values?.[param.name] ?? []}
              options={param.options ?? []}
              control={controlType}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if controlType === 'range'}
            <RangeControl
              value={values?.[param.name] ?? null}
              min={param.min}
              max={param.max}
              step={param.step}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if controlType === 'select' || controlType === 'radio'}
            <SelectControl
              value={values?.[param.name] ?? undefined}
              options={param.options ?? []}
              control={controlType}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if controlType === 'textarea' || controlType === 'text'}
            <TextInputControl
              value={values?.[param.name] ?? ''}
              control={controlType}
              numberOfRows={param.numberOfRows}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else}
            <JsonControl
              value={values?.[param.name] ?? null}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {/if}
        </div>
        {#if param.description && openDescriptionKeys.has(param.name)}
          <div class="description">{param.description}</div>
        {/if}
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  @use './controls/button.scss';
  @use './controls/button_unset.scss';

  .pane {
    width: 100%;
    padding: 1.25rem;
    overflow-y: auto;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 2.125rem;
    margin-bottom: 1rem;
  }
  .header-actions {
    display: flex;
    align-items: center;
    min-height: 2.125rem;
    gap: 0.5rem;
  }
  .title {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--c-basic-800);
  }
  .empty {
    color: var(--c-basic-600);
    font-size: 0.9rem;
  }
  .grid {
    display: grid;
    grid-template-columns: minmax(120px, auto) 1fr;
    gap: 0.75rem;
    align-items: start;
  }
  .label-cell {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .label-row {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }
  .label-cell-unset {
    display: flex;
    justify-content: flex-start;
  }
  .btn_unset {
    margin-left: 0;
  }
  .unset-info {
    margin: 0;
    text-align: left;
  }
  .label {
    margin: 0.313rem 0 0;
    font-size: 0.938rem;
    font-weight: 500;
    color: var(--c-basic-900);
  }
  .info-btn {
    display: inline-flex;
    margin: -0.15rem 0;
    padding: 0.15rem;
    color: var(--c-basic-900);
  }
  .info-btn:hover {
    color: var(--c-primary);
  }
  .info-btn[aria-expanded='true'] {
    color: var(--c-primary);
  }
  .description {
    grid-column: 1 / -1;
    margin: -0.25rem 0 0;
    padding: 0.5rem 0.75rem;
    font-size: 0.813rem;
    color: var(--c-basic-800);
    line-height: 1.35;
    background-color: var(--c-primary-bg);
  }
</style>
