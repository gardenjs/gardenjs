<script lang="ts">
  let {
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
  }: {
    value: number | null
    onChange: (value: number | null) => void
    min?: number
    max?: number
    step?: number
  } = $props()

  let isUnset = $derived(value === undefined || value === null)
</script>

<div class="row">
  <div class="slider-wrapper">
    <input
      class="range"
      type="range"
      {min}
      {max}
      {step}
      value={value ?? min}
      oninput={(e) => {
        const newValue = parseFloat((e.currentTarget as HTMLInputElement).value)
        onChange(newValue)
      }}
    />
  </div>
  <div class="value">{isUnset ? '-' : value}</div>
  {#if !isUnset}
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
  {:else}
    <span class="unset-info">is not set</span>
  {/if}
</div>

<style lang="scss">
  @import './button_unset.scss';

  .row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .slider-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    height: 1.5rem;
  }

  .range {
    width: 100%;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    outline: none;
    padding: 0;
    margin: 0;
  }

  .range::-webkit-slider-runnable-track {
    width: 100%;
    height: 0.25rem;
    background-color: var(--c-basic-250);
    border-radius: 0.125rem;
    border: none;
  }

  .range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1.125rem;
    height: 1.125rem;
    background: var(--c-primary);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 1px 0.25rem rgba(0, 0, 0, 0.3);
    margin-top: -8px;
  }

  .range::-webkit-slider-thumb:hover {
    background: var(--c-primary-hover, var(--c-primary));
  }

  .range::-moz-range-track {
    width: 100%;
    height: 0.25rem;
    background: var(--c-basic-300);
    border-radius: 0.125rem;
    border: none;
  }

  .range::-moz-range-thumb {
    width: 1.125rem;
    height: 1.125rem;
    background: var(--c-primary);
    border: 0.125rem solid var(--c-basic-0);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 1px 0.25rem rgba(0, 0, 0, 0.3);
  }

  .range::-moz-range-thumb:hover {
    background: var(--c-primary-hover, var(--c-primary));
  }

  .range:focus {
    outline: none;
  }

  .range:focus::-webkit-slider-thumb {
    box-shadow:
      0 0 0 0.188rem var(--c-primary-bg),
      0 1px 0.25rem rgba(0, 0, 0, 0.3);
  }

  .range:focus::-moz-range-thumb {
    box-shadow:
      0 0 0 0.188rem var(--c-primary-bg),
      0 1px 0.25rem rgba(0, 0, 0, 0.3);
  }

  .value {
    min-width: 3rem;
    text-align: right;
    font-size: 0.938rem;
    font-weight: 500;
    color: var(--c-basic-800);
  }
</style>
