<script lang="ts">
  let {
    value,
    onChange,
    options = [],
    variant = 'dropdown',
  }: {
    value: string[]
    onChange: (value: string[]) => void
    options?: string[] | { label: string; value: string }[]
    variant?: 'dropdown' | 'checkboxes'
  } = $props()

  let isUnset = $derived(
    value === undefined || value === null || value.length === 0
  )

  let normalizedOptions = $derived(
    options.map((opt) =>
      typeof opt === 'string' ? { label: opt, value: opt } : opt
    )
  )

  let isOpen = $state(false)

  function toggleOption(optionValue: string) {
    const newValue = value?.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...(value || []), optionValue]
    onChange(newValue.length > 0 ? newValue : [])
  }

  function handleUnset() {
    onChange([])
    isOpen = false
  }
</script>

{#if variant === 'dropdown'}
  <div class="row">
    <div class="select-wrapper">
      <button
        class="select-button"
        onclick={() => (isOpen = !isOpen)}
        type="button"
      >
        <span class="selected-text">
          {#if isUnset}
            <span class="placeholder">Select...</span>
          {:else}
            {value.length} selected
          {/if}
        </span>
        <svg
          class="arrow"
          class:open={isOpen}
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
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      {#if isOpen}
        <div class="dropdown">
          {#each normalizedOptions as option (option.value)}
            <label class="dropdown-item">
              <input
                type="checkbox"
                checked={value?.includes(option.value) || false}
                onchange={() => toggleOption(option.value)}
              />
              <span>{option.label}</span>
            </label>
          {/each}
        </div>
      {/if}
    </div>
    {#if !isUnset}
      <button class="btn_unset" onclick={handleUnset}>
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
{:else if variant === 'checkboxes'}
  <div class="checkboxes-container">
    {#each normalizedOptions as option (option.value)}
      <label class="checkbox-item">
        <input
          type="checkbox"
          checked={value?.includes(option.value) || false}
          onchange={() => toggleOption(option.value)}
        />
        <span>{option.label}</span>
      </label>
    {/each}
  </div>
  {#if !isUnset}
    <button class="btn_unset checkboxes-btn-unset" onclick={handleUnset}>
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
    <div class="unset-info checkboxes-unset">is not set</div>
  {/if}
{/if}

<style lang="scss">
  @import './button_unset.scss';

  .row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .select-wrapper {
    flex: 1;
    position: relative;
  }

  .select-button {
    width: 100%;
    height: 1.5rem;
    padding: 0.125rem 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid var(--c-primary);
    border-radius: 0.125rem;
    background-color: var(--c-basic-0);
    font-size: 0.938rem;
    color: var(--c-basic-800);
    cursor: pointer;
  }

  .select-button:focus {
    outline: none;
    background-color: var(--c-primary-bg);
    box-shadow: 0 0 0 1px var(--c-primary);
  }

  .selected-text {
    flex: 1;
    text-align: left;
  }

  .placeholder {
    color: var(--c-basic-500);
  }

  .arrow {
    transition: transform 0.2s;
    color: var(--c-basic-600);
  }

  .arrow.open {
    transform: rotate(180deg);
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    right: 0;
    max-height: 200px;
    overflow-y: auto;
    background: var(--c-basic-0);
    border: 1px solid var(--c-primary);
    border-radius: 0.125rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0.5rem;
    cursor: pointer;
    font-size: 0.938rem;
    color: var(--c-basic-700);
  }

  .dropdown-item:hover {
    background-color: var(--c-primary-bg);
    color: var(--c-basic-800);
  }

  .dropdown-item span {
    user-select: none;
  }

  .dropdown-item input[type='checkbox'] {
    cursor: pointer;
    margin: 0;
    width: 1.125rem;
    height: 1.125rem;
    border: 1px solid var(--c-primary);
    background-color: var(--c-basic-0);
  }

  @supports (appearance: none) {
    .dropdown-item input[type='checkbox'] {
      appearance: none;
      position: relative;
      border-radius: 0.125rem;
      transition: all 0.15s ease;
    }

    .dropdown-item input[type='checkbox']:hover {
      border-color: var(--c-primary);
    }

    .dropdown-item input[type='checkbox']:checked {
      border-color: var(--c-primary);
      background: var(--c-primary);
    }

    .dropdown-item input[type='checkbox']:checked::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      width: 0.313rem;
      height: 0.563rem;
      border: 0.125rem solid var(--c-basic-0);
      border-top: 0;
      border-left: 0;
    }

    .dropdown-item input[type='checkbox']:focus {
      outline: none;
      box-shadow: 0 0 0 1px var(--c-primary);
    }
  }

  .checkboxes-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .checkbox-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.938rem;
    color: var(--c-basic-700);
  }

  .checkbox-item:hover {
    color: var(--c-basic-800);
  }

  .checkbox-item span {
    user-select: none;
  }

  .checkbox-item input[type='checkbox'] {
    cursor: pointer;
    margin: 0;
    width: 1.125rem;
    height: 1.125rem;
    border: 1px solid var(--c-primary);
    background-color: var(--c-basic-0);
  }

  @supports (appearance: none) {
    .checkbox-item input[type='checkbox'] {
      appearance: none;
      position: relative;
      border-radius: 0.125rem;
      transition: all 0.15s ease;
    }

    .checkbox-item input[type='checkbox']:hover {
      border-color: var(--c-primary);
    }

    .checkbox-item input[type='checkbox']:checked {
      border-color: var(--c-primary);
      background: var(--c-primary);
    }

    .checkbox-item input[type='checkbox']:checked::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      width: 0.313rem;
      height: 0.563rem;
      border: 0.125rem solid var(--c-basic-0);
      border-top: 0;
      border-left: 0;
    }

    .checkbox-item input[type='checkbox']:focus {
      outline: none;
      box-shadow: 0 0 0 1px var(--c-primary);
    }
  }

  .checkboxes-unset,
  .checkboxes-btn-unset {
    margin: 0.75rem 0 0;
  }

  .checkboxes-unset {
    line-height: 1.25rem;
  }
</style>
