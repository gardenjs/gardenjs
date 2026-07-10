<script lang="ts">
  let {
    value,
    onChange,
    control = 'checkbox',
  }: {
    value: boolean
    onChange: (value: boolean) => void
    control?: 'checkbox' | 'toggle'
  } = $props()
</script>

<div class="boolean-row">
  <div class="boolean-control">
    <input
      type="checkbox"
      class={control}
      checked={value === true}
      onchange={(e) => {
        onChange((e.currentTarget as HTMLInputElement).checked)
      }}
    />
  </div>
  <div class="unset-area">
    {#if value === undefined || value === null}
      <span class="unset-info">is not set</span>
    {:else}
      <button class="btn_unset" onclick={() => onChange(undefined as any)}>
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
          stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg
        >
        unset
      </button>
    {/if}
  </div>
</div>

<style lang="scss">
  @use './button_unset.scss';
  @use './checkbox.scss';

  .boolean-row {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    width: 100%;
  }

  .boolean-control {
    flex: 1;
    min-width: 0;
  }

  .boolean-row .unset-area {
    flex-shrink: 0;
  }

  input {
    border: 1px solid var(--c-basic-150);
    background: var(--c-basic-0);
    color: var(--c-basic-800);
  }
  @supports (appearance: none) {
    input[type='checkbox'].toggle {
      appearance: none;
      position: relative;
      display: inline-block;
      margin: 0;
      padding: 0;
      width: 2.5rem;
      height: 1.25rem;
      vertical-align: top;
      outline: none;
      border: 1px solid var(--c-primary);
      border-radius: 1.125rem;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:after {
        position: absolute;
        display: block;
        content: '';
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: var(--c-basic-0);
        left: 0.0625rem;
        top: 0.0625rem;
        transition:
          left 0.2s ease,
          background-color 0.2s ease;
      }

      &:checked {
        background-color: var(--c-primary-bg);
        border-color: var(--c-primary);
      }

      &:checked:after {
        left: 1.3125rem;
        background-color: var(--c-primary);
      }

      &:not(:checked) {
        background-color: var(--c-basic-300);
        border-color: var(--c-basic-300);
      }

      &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 1px var(--c-primary);
      }
    }
  }
</style>
