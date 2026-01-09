<script lang="ts" generics="Value">
  import type { Snippet } from 'svelte'

  let {
    onChange,
    value = $bindable<Value>(),
    children,
  }: {
    onChange: (_value: Value) => void
    value: Value
    children: Snippet<[setValue: (_v: Value) => void]>
  } = $props()

  const setValue = (v: Value) => {
    value = v
    onChange(v)
  }
</script>

<div class="param_type">
  {@render children(setValue)}
</div>

<style>
  .param_type {
    padding: 0.375rem 0.5rem;
  }
</style>
