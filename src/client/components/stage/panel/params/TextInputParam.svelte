<script lang="ts">
  let {
    value,
    onChange,
  }: { value: string; onChange: (value: string) => void } = $props()
</script>

<input
  class="input"
  type="text"
  value={String(value ?? '')}
  oninput={(e) => {
    onChange(String((e.currentTarget as HTMLInputElement).value ?? ''))
  }}
/>

<style>
  @import './input.scss';
</style>
