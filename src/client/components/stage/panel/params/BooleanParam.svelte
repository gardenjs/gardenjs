<script lang="ts">
  let {
    value,
    onChange,
  }: { value: boolean; onChange: (value: boolean) => void } = $props()
</script>

<input
  type="checkbox"
  checked={value === true}
  onchange={(e) => {
    onChange((e.currentTarget as HTMLInputElement).checked)
  }}
/>

<style>
  input {
    border: 1px solid var(--c-basic-150);
    border-radius: 0.375rem;
    background: var(--c-basic-0);
    color: var(--c-basic-800);
  }
</style>
