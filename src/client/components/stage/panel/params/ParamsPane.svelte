<script>
  import ArrayParam from './ArrayParam.svelte'
  import BooleanParam from './BooleanParam.svelte'
  import ColorPickerParam from './ColorPickerParam.svelte'
  import DateParam from './DateParam.svelte'
  import DatetimeParam from './DatetimeParam.svelte'
  import NumberParam from './NumberParam.svelte'
  import ObjectParam from './ObjectParam.svelte'
  import ObjectRendererParam from './ObjectRendererParam.svelte'
  import SelectParam from './SelectParam.svelte'
  import TextInputParam from './TextInputParam.svelte'
  import TimeParam from './TimeParam.svelte'

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
            <BooleanParam
              value={values?.[param.name] ?? undefined}
              variant={param.variant ?? 'checkbox'}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if paramType === 'number'}
            <NumberParam
              value={values?.[param.name] ?? null}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if paramType === 'color'}
            <ColorPickerParam
              value={values?.[param.name] ?? undefined}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if paramType === 'date'}
            <DateParam
              value={values?.[param.name] ?? undefined}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if paramType === 'time'}
            <TimeParam
              value={values?.[param.name] ?? undefined}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if paramType === 'datetime'}
            <DatetimeParam
              value={values?.[param.name] ?? undefined}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if paramType === 'array'}
            <ArrayParam
              value={values?.[param.name] ?? []}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if paramType === 'object'}
            <ObjectParam
              value={values?.[param.name] ?? {}}
              schema={param.schema ?? {}}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if paramType === 'objectrenderer'}
            <ObjectRendererParam
              value={values?.[param.name] ?? []}
              schema={param.schema ?? {}}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if paramType === 'select'}
            <SelectParam
              value={values?.[param.name] ?? undefined}
              options={param.options ?? []}
              variant={param.variant ?? 'dropdown'}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else}
            <TextInputParam
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
  @import './button.scss';

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
