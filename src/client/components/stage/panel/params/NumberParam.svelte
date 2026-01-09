<script lang="ts">
  import ParamType from './ParamType.svelte'
  import type { ComponentProps } from 'svelte'

  let {
    value = $bindable(0),
    onChange,
  }: Omit<ComponentProps<typeof ParamType>, 'children'> = $props()
</script>

<ParamType {onChange} bind:value>
  {#snippet children(setValue)}
    <input
      type="number"
      value={value ?? 0}
      oninput={(e) => {
        const t = e.currentTarget as HTMLInputElement
        const n = t.valueAsNumber
        if (Number.isFinite(n)) setValue(n)
      }}
    />
  {/snippet}
</ParamType>

<style>
  :global(.param_type input[type='number']) {
    width: 100%;
    border: 1px solid var(--c-basic-150);
    border-radius: 0.375rem;
    background: var(--c-basic-0);
    color: var(--c-basic-800);
    -moz-appearance: auto;
    appearance: auto;
  }

  :global(.param_type input[type='number']::-webkit-inner-spin-button),
  :global(.param_type input[type='number']::-webkit-outer-spin-button) {
    -webkit-appearance: auto;
    margin: 0;
  }
</style>
