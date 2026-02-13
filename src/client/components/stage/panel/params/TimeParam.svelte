<script lang="ts">
  let {
    value,
    onChange,
  }: { value: string; onChange: (value: string) => void } = $props()

  let isUnset = $derived(!value || value === undefined || value === null)
</script>

<div class="row">
  <input
    class="input"
    type="time"
    value={value ?? ''}
    onchange={(e) => {
      const newValue = (e.currentTarget as HTMLInputElement).value
      onChange(newValue || (undefined as any))
    }}
  />
  {#if isUnset}
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
        stroke-linejoin="round"
      >
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
      unset
    </button>
  {/if}
</div>

<style lang="scss">
  @use './input.scss';
  @use './button_unset.scss';

  .row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  input[type='time'] {
    cursor: pointer;
    flex: 1;
  }

  input[type='time']::-webkit-calendar-picker-indicator {
    cursor: pointer;
    color: var(--c-primary);
  }
</style>
