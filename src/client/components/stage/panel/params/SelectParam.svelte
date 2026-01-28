<script>
  let { value, onChange, options = [] } = $props()

  let isUnset = $derived(!value || value === undefined || value === null)
</script>

<div class="row">
  <div class="container">
    <select
      class="select"
      value={value ?? ''}
      onchange={(e) => onChange(e.currentTarget.value)}
    >
      {#if !value}
        <option value="" disabled>Select an option...</option>
      {/if}
      {#each options as option, index (option.value ?? option ?? index)}
        <option value={option.value ?? option}>
          {option.label ?? option}
        </option>
      {/each}
    </select>
    <svg
      class="icon"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  </div>
  {#if isUnset}
    <span class="unset-info">is not set</span>
  {:else}
    <button class="btn_unset" onclick={() => onChange(undefined)}>
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

<style>
  @import './button_unset.scss';

  .row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .container {
    position: relative;
    display: block;
    flex: 1;
  }

  .select {
    padding: 0.125rem 0.5rem;
    width: 100%;
    height: 1.5rem;
    border: 1px solid var(--c-primary);
    border-radius: 0.125rem;
    background-color: var(--c-basic-0);
    font-size: 0.938rem;
    color: var(--c-basic-800);
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .select:focus {
    outline: none;
    box-shadow: 0 0 0 1px var(--c-primary);
  }

  .select:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon {
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translateY(-50%);
    color: var(--c-primary);
    pointer-events: none;
  }
</style>
