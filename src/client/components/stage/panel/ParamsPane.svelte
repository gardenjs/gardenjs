<script>
  import ArrayControl from './controls/ArrayControl.svelte'
  import BooleanControl from './controls/BooleanControl.svelte'
  import ColorPickerControl from './controls/ColorPickerControl.svelte'
  import DateControl from './controls/DateControl.svelte'
  import DatetimeControl from './controls/DatetimeControl.svelte'
  import MultiselectControl from './controls/MultiselectControl.svelte'
  import NumberControl from './controls/NumberControl.svelte'
  import ObjectControl from './controls/ObjectControl.svelte'
  import RangeControl from './controls/RangeControl.svelte'
  import SelectControl from './controls/SelectControl.svelte'
  import TextInputControl from './controls/TextInputControl.svelte'
  import TimeControl from './controls/TimeControl.svelte'

  let { params = [], values = {}, onChange, onReset } = $props()

  const getParamType = (param) => String(param?.type ?? '').toLowerCase()
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
        {@const paramType = getParamType(param)}
        <div class="label">
          {param.label || param.name}
        </div>
        <div class="input">
          {#if paramType === 'boolean'}
            <BooleanControl
              value={values?.[param.name] ?? undefined}
              variant={param.variant ?? 'checkbox'}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if paramType === 'number'}
            <NumberControl
              value={values?.[param.name] ?? null}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if paramType === 'color'}
            <ColorPickerControl
              value={values?.[param.name] ?? undefined}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if paramType === 'date'}
            <DateControl
              value={values?.[param.name] ?? undefined}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if paramType === 'time'}
            <TimeControl
              value={values?.[param.name] ?? undefined}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if paramType === 'datetime'}
            <DatetimeControl
              value={values?.[param.name] ?? undefined}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if paramType === 'array'}
            <ArrayControl
              value={values?.[param.name] ?? []}
              schema={param.schema ?? {}}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if paramType === 'object'}
            <ObjectControl
              value={values?.[param.name] ?? {}}
              schema={param.schema ?? {}}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if paramType === 'multiselect'}
            <MultiselectControl
              value={values?.[param.name] ?? []}
              options={param.options ?? []}
              variant={param.variant ?? 'dropdown'}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if paramType === 'range'}
            <RangeControl
              value={values?.[param.name] ?? null}
              min={param.min}
              max={param.max}
              step={param.step}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if paramType === 'select'}
            <SelectControl
              value={values?.[param.name] ?? undefined}
              options={param.options ?? []}
              variant={param.variant ?? 'dropdown'}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else}
            <TextInputControl
              value={values?.[param.name] ?? ''}
              variant={param.variant ?? 'text'}
              rows={param.rows}
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
