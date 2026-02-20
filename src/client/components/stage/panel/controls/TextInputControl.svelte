<script lang="ts">
  let {
    value,
    onChange,
    control = 'text',
    numberOfRows = 4,
  }: {
    value: string
    onChange: (value: string) => void
    control?: 'text' | 'textarea'
    numberOfRows?: number
  } = $props()

  let isUnset = $derived(!value || value === undefined || value === null)
</script>

<div class="row">
  <div class="container">
    {#if control === 'textarea'}
      <textarea
        class="input textarea"
        rows={numberOfRows}
        value={String(value ?? '')}
        oninput={(e) => {
          onChange(String((e.currentTarget as HTMLTextAreaElement).value ?? ''))
        }}
      ></textarea>
    {:else}
      <input
        class="input"
        type="text"
        value={String(value ?? '')}
        oninput={(e) => {
          onChange(String((e.currentTarget as HTMLInputElement).value ?? ''))
        }}
      />
    {/if}
  </div>
  <div class="unset-area">
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
</div>

<style lang="scss">
  @use './input.scss';
  @use './button_unset.scss';

  .row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .container {
    flex: 1;
    display: block;
  }

  .textarea {
    resize: vertical;
    height: auto;
    line-height: 1.4;
    padding: 0.375rem 0.5rem;
  }
</style>
