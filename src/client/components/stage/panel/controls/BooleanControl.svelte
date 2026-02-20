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

<input
  type="checkbox"
  class={control}
  checked={value === true}
  onchange={(e) => {
    onChange((e.currentTarget as HTMLInputElement).checked)
  }}
/>
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

<style lang="scss">
  @use './button_unset.scss';

  input {
    border: 1px solid var(--c-basic-150);
    background: var(--c-basic-0);
    color: var(--c-basic-800);
  }
  @supports (appearance: none) {
    input[type='checkbox'] {
      appearance: none;
      position: relative;
      display: inline-block;
      margin: 0;
      padding: 0;
      height: 1.25rem;
      vertical-align: top;
      outline: none;
      border: 1px solid var(--c-primary);
      cursor: pointer;
      &:after {
        position: absolute;
        display: block;
        content: '';
        left: 0;
        top: 0;
      }
      &:checked {
        background-color: var(--c-primary);
        border: 1px solid var(--c-primary);
      }
      &:disabled {
        background-color: var(--c-text);
        cursor: not-allowed;
        opacity: 0.4;
        &:checked {
          background-color: var(--c-text);
          border-color: var(--c-text);
        }
      }
      &:hover {
        &:not(:checked) {
          &:not(:disabled) {
            border-color: var(--c-primary);
          }
        }
      }
      &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 1px var(--c-primary);
      }
    }

    // checkbox variant
    input[type='checkbox'].checkbox {
      width: 1.25rem;
      border-radius: 0;
      &:after {
        width: 0.313rem;
        height: 0.563rem;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        left: 0.4rem;
        top: 0.2125rem;
        transform: rotate(43deg);
        opacity: var(--o, 0);
      }
      &:checked {
        --o: 1;
      }
    }

    // toggle variant
    input[type='checkbox'].toggle {
      width: 2.5rem;
      border-radius: 1.125rem;
      transition: background-color 0.2s ease;

      &:after {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: var(--c-basic-0);
        left: 0.0625rem;
        top: 0.0625rem;
        transition: left 0.2s ease;
      }

      &:checked:after {
        left: 1.3125rem;
      }

      &:not(:checked) {
        background-color: var(--c-basic-300);
        border-color: var(--c-basic-300);
      }
    }
  }
</style>
