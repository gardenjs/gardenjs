<script>
  import BooleanParam from './params/BooleanParam.svelte'
  import NumberParam from './params/NumberParam.svelte'
  import TextInputParam from './params/TextInputParam.svelte'

  let { params = [], values = {}, onChange, onReset } = $props()

  const getParamType = (param) => String(param?.type ?? '').toLowerCase()
</script>

<div class="params">
  <div class="header">
    <div class="title">Parameters</div>
    <button class="reset" onclick={() => onReset?.()}>Reset</button>
  </div>

  {#if params.length === 0}
    <div class="empty">No parameters defined.</div>
  {:else}
    <div class="grid">
      {#each params as param (param.name)}
        {@const paramType = getParamType(param)}

        <div class="row">
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
            {:else}
              <TextInputParam
                value={values?.[param.name] ?? ''}
                onChange={(v) => onChange?.(param.name, v)}
              />
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
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
  .reset {
    padding: 0.375rem 0.75rem;
    font-size: 0.8rem;
    background: var(--c-basic-100);
    border-radius: 0.375rem;
    color: var(--c-basic-800);
  }
  .reset:hover,
  .reset:focus-visible {
    background: var(--c-basic-150);
    color: var(--c-primary);
  }
  .empty {
    color: var(--c-basic-600);
    font-size: 0.9rem;
  }
  .grid {
    display: grid;
    gap: 0.75rem;
  }
  .row {
    display: grid;
    grid-template-columns: minmax(120px, 220px) 1fr;
    gap: 0.75rem;
    align-items: center;
  }
  .label {
    font-size: 0.85rem;
    color: var(--c-basic-700);
  }
</style>
