<script lang="ts">
  import ParamType from './ParamType.svelte'
  import type { ComponentProps } from 'svelte'

  let {
    value = $bindable(''),
    onChange,
  }: Omit<ComponentProps<typeof ParamType>, 'children'> = $props()
</script>

<ParamType {onChange} bind:value>
  {#snippet children(setValue)}
    <input
      type="text"
      value={String(value ?? '')}
      oninput={(e) =>
        setValue(String((e.currentTarget as HTMLInputElement).value ?? ''))}
    />
  {/snippet}
</ParamType>

<style>
  :global(.param_type input[type='text']) {
    width: 100%;
    border: 1px solid var(--c-basic-150);
    border-radius: 0.375rem;
    background: var(--c-basic-0);
    color: var(--c-basic-800);
  }
</style>
