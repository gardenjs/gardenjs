<script lang="ts">
  import ParamType from './ParamType.svelte'
  import type { ComponentProps } from 'svelte'

  let {
    value = $bindable(false),
    onChange,
  }: Omit<ComponentProps<typeof ParamType>, 'children'> = $props()
</script>

<ParamType {onChange} bind:value>
  {#snippet children(setValue)}
    <input
      type="checkbox"
      checked={value === true}
      onchange={(e) => setValue((e.currentTarget as HTMLInputElement).checked)}
    />
  {/snippet}
</ParamType>

<style>
  :global(.param_type input[type='checkbox']) {
    border: 1px solid var(--c-basic-150);
    border-radius: 0.375rem;
    background: var(--c-basic-0);
    color: var(--c-basic-800);
  }
</style>
