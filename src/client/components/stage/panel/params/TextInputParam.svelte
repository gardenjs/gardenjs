<script lang="ts">
  let {
    value,
    onChange,
  }: { value: string; onChange: (value: string) => void } = $props()
</script>

<input
  type="text"
  value={String(value ?? '')}
  oninput={(e) => {
    onChange(String((e.currentTarget as HTMLInputElement).value ?? ''))
  }}
/>

<style>
  input {
    width: 100%;
    border: 1px solid var(--c-basic-150);
    border-radius: 0.375rem;
    background: var(--c-basic-0);
    color: var(--c-basic-800);
  }
</style>
