<script lang="ts">
  let {
    value,
    onChange,
  }: {
    value: string
    onChange: (value: string) => void
  } = $props()
</script>

<textarea
  class="input textarea"
  rows="5"
  value={String(value ?? '')}
  onchange={(e) => {
    onChange(JSON.parse((e.currentTarget as HTMLTextAreaElement).value ?? ''))
  }}
></textarea>

<style lang="scss">
  @use './input.scss';

  .textarea {
    resize: vertical;
    height: auto;
    line-height: 1.4;
    padding: 0.375rem 0.5rem;
  }
</style>
