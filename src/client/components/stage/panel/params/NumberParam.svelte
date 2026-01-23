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
  @import './styles.scss';

  input {
    padding-right: 0;
    -moz-appearance: auto;
    appearance: auto;
  }
  input::-webkit-inner-spin-button,
  input::-webkit-outer-spin-button {
    -webkit-appearance: auto;
    margin: 0;
  }
</style>
