<script>
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

  let { params = [], values = {}, onChange, onReset } = $props()

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
</script>

<div class="pane">
  <div class="header">
    <div class="title">Parameters</div>
    <button
      class="btn btn_reset"
      title="Reset all parameters"
      aria-label="Reset all parameters"
      onclick={() => onReset?.()}>Reset</button
    >
  </div>

  {#if params.length === 0}
    <div class="empty">No parameters defined.</div>
  {:else}
    <div class="grid">
      {#each params as param (param.name)}
        {@const controlType = getControlType(param)}
        <div class="label">
          {param.label || param.name}
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
              value={values?.[param.name] ?? ''}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  @import './controls/button.scss';

  .pane {
    width: 100%;
    padding: 1.25rem;
    overflow-y: auto;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
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
  .label {
    font-size: 0.938rem;
    font-weight: 500;
    color: var(--c-basic-700);
    max-width: 220px;
  }
</style>
