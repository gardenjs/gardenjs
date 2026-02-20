<script>
  let { value, onChange, options = [], control = 'dropdown' } = $props()

  let isUnset = $derived(!value || value === undefined || value === null)
</script>

{#if control === 'radio'}
  <div class="radio-group">
    {#each options as option, index (option.value ?? option ?? index)}
      {@const optionValue = option.value ?? option}
      {@const optionLabel = option.label ?? option}
      <label class="radio-option">
        <input
          type="radio"
          name="radio-{Math.random()}"
          value={optionValue}
          checked={value === optionValue}
          onchange={(e) => onChange(e.currentTarget.value)}
        />
        <span class="radio-label">{optionLabel}</span>
      </label>
    {/each}
  </div>
  {#if isUnset}
    <div class="unset-info radio-unset">is not set</div>
  {:else}
    <button
      class="btn_unset radio-btn-unset"
      onclick={() => onChange(undefined)}
    >
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
{:else}
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
{/if}

<style lang="scss">
  @use './button_unset.scss';

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

  /* Radio variant styles */
  .radio-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .radio-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.938rem;
    color: var(--c-basic-700);
  }

  .radio-option:hover {
    color: var(--c-basic-800);
  }

  .radio-label {
    user-select: none;
  }

  input[type='radio'] {
    cursor: pointer;
    margin: 0;
    width: 1.125rem;
    height: 1.125rem;
    border: 1px solid var(--c-primary);
    background-color: var(--c-basic-0);
  }

  @supports (appearance: none) {
    input[type='radio'] {
      appearance: none;
      position: relative;
      border-radius: 50%;
      transition: all 0.15s ease;
    }

    input[type='radio']:hover {
      border-color: var(--c-primary);
    }

    input[type='radio']:checked {
      border-color: var(--c-primary);
      background: var(--c-primary);
    }

    input[type='radio']:checked::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0.375rem;
      height: 0.375rem;
      border-radius: 50%;
      background-color: var(--c-basic-0);
    }

    input[type='radio']:focus-visible {
      outline: none;
      box-shadow: 0 0 0 1px var(--c-primary);
    }
  }

  .radio-unset,
  .radio-btn-unset {
    margin: 0.75rem 0 0;
  }

  .radio-unset {
    line-height: 1.25rem;
  }
</style>
