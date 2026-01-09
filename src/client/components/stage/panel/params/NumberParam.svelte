<script lang="ts">
  let {
    value,
    onChange,
  }: { value: number; onChange: (value: number) => void } = $props()
</script>

<input
  type="number"
  value={value ?? 0}
  oninput={(e) => {
    const newValue = (e.currentTarget as HTMLInputElement).valueAsNumber
    if (Number.isFinite(newValue)) onChange(newValue)
  }}
/>

<style>
  input {
    width: 100%;
    border: 1px solid var(--c-basic-150);
    border-radius: 0.375rem;
    background: var(--c-basic-0);
    color: var(--c-basic-800);
    -moz-appearance: auto;
    appearance: auto;
  }

  input::-webkit-inner-spin-button,
  input::-webkit-outer-spin-button {
    -webkit-appearance: auto;
    margin: 0;
  }
</style>
