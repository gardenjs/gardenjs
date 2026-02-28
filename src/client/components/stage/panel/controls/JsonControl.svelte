<script lang="ts">
  let {
    value,
    onChange,
  }: {
    value: unknown
    onChange: (value: unknown) => void
  } = $props()

  let isUnset = $derived(value === undefined || value === null)

  function handleChange(raw: string) {
    const trimmed = raw.trim()
    if (trimmed === '') {
      onChange(null)
      return
    }
    try {
      onChange(JSON.parse(trimmed))
    } catch {
      // ungültiges JSON – optional: Fehler anzeigen oder ignorieren
    }
  }
</script>

<div class="row">
  <div class="container">
    <textarea
      class="input textarea"
      rows="10"
      value={isUnset ? '' : JSON.stringify(value, null, 2)}
      onchange={(e) =>
        handleChange((e.currentTarget as HTMLTextAreaElement).value ?? '')}
    ></textarea>
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
  @use './input.scss';

  .row {
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
  }
  .container {
    flex: 1;
    display: block;
    min-width: 0;
  }
  .textarea {
    resize: vertical;
    height: auto;
    line-height: 1.4;
    padding: 0.375rem 0.5rem;
  }
</style>
