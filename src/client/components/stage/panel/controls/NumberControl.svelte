<script lang="ts">
  let {
    value,
    onChange,
  }: { value: number | null; onChange: (value: number | null) => void } =
    $props()

  let isUnset = $derived(value === undefined || value === null)
</script>

<div class="row">
  <div class="container">
    <input
      class="input"
      type="number"
      value={value ?? ''}
      oninput={(e) => {
        const newValue = (e.currentTarget as HTMLInputElement).valueAsNumber
        if (Number.isFinite(newValue)) {
          onChange(newValue)
        } else {
          onChange(null)
        }
      }}
    />
  </div>
  <div class="unset-area">
    {#if isUnset}
      <span class="unset-info">is not set</span>
    {:else}
      <button class="btn_unset" onclick={() => onChange(null)}>
        <svg
          class="close"
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
        unset
      </button>
    {/if}
  </div>
</div>

<style lang="scss">
  @use './button_unset.scss';
  @import './input.scss';

  .row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  .container {
    flex: 1;
    display: block;
  }
  .input {
    padding-right: 0;
    -moz-appearance: auto;
    appearance: auto;
  }
  .input::-webkit-inner-spin-button,
  .input::-webkit-outer-spin-button {
    -webkit-appearance: auto;
    margin: 0;
  }
</style>
