<script>
  import ArrayParam from './ArrayParam.svelte'
  import BooleanParam from './BooleanParam.svelte'
  import ColorPickerParam from './ColorPickerParam.svelte'
  import NumberParam from './NumberParam.svelte'
  import TextInputParam from './TextInputParam.svelte'

  let { params = [], values = {}, onChange, onReset } = $props()

  const getParamType = (param) => String(param?.type ?? '').toLowerCase()
</script>

<div class="pane">
  <div class="header">
    <div class="title">Parameters</div>
    <button
      class="btn btn_reset"
      title="Reset all parameters to their default values"
      aria-label="Reset all parameters to their default values"
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
              value={values?.[param.name] ?? false}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if paramType === 'number'}
            <NumberParam
              value={values?.[param.name] ?? 0}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if paramType === 'color'}
            <ColorPickerParam
              value={values?.[param.name] ?? param.default ?? '#000000'}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else if paramType === 'array'}
            <ArrayParam
              value={values?.[param.name] ?? param.default ?? []}
              onChange={(v) => onChange?.(param.name, v)}
            />
          {:else}
            <TextInputParam
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
  @import './styles.scss';

  .pane {
    width: 100%;
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
