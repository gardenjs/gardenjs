<script lang="ts">
  let {
    value,
    onChange,
    control = 'text',
    rows = 4,
  }: {
    value: string
    onChange: (value: string) => void
    control?: 'text' | 'textarea'
    rows?: number
  } = $props()
</script>

{#if control === 'textarea'}
  <textarea
    class="input textarea"
    {rows}
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

<style lang="scss">
  @use './input.scss';

  .textarea {
    resize: vertical;
    height: auto;
    line-height: 1.4;
    padding: 0.375rem 0.5rem;
  }
</style>
