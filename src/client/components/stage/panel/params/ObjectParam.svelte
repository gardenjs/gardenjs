<script>
  let { value, onChange } = $props()

  function addProperty() {
    const newObject = { ...(value || {}), '': '' }
    onChange(newObject)
  }

  function removeProperty(key) {
    const newObject = { ...value }
    delete newObject[key]
    onChange(newObject)
  }

  function updateKey(oldKey, newKey) {
    if (oldKey === newKey) return
    const newObject = {}
    for (const k in value) {
      if (k === oldKey) {
        newObject[newKey] = value[oldKey]
      } else {
        newObject[k] = value[k]
      }
    }
    onChange(newObject)
  }

  function updateValue(key, newValue) {
    const newObject = { ...value, [key]: newValue }
    onChange(newObject)
  }

  let entries = $derived(Object.entries(value || {}))
</script>

<div class="object-param">
  {#if entries.length > 0}
    {#each entries as [key, val], index (index)}
      <div class="object-item">
        <input
          type="text"
          class="key-input"
          value={key}
          placeholder="key"
          oninput={(e) => updateKey(key, e.currentTarget.value)}
        />
        <span class="separator">:</span>
        <input
          type="text"
          class="value-input"
          value={String(val ?? '')}
          placeholder="value"
          oninput={(e) => updateValue(key, e.currentTarget.value)}
        />
        <button
          class="btn btn_remove"
          title="Remove property"
          aria-label="Remove property"
          onclick={() => removeProperty(key)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg
          >
        </button>
      </div>
    {/each}
  {/if}
  <button class="btn" onclick={addProperty}>
    <svg
      class="plus"
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg
    >
    Add Property
  </button>
</div>

<style>
  @import './styles.scss';

  .object-param {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    width: 100%;
  }

  .object-item {
    display: flex;
    gap: 0.25rem;
    align-items: center;
  }

  .key-input {
    flex: 0 0 35%;
    min-width: 0;
  }

  .separator {
    color: var(--c-basic-500);
    font-weight: 500;
  }

  .value-input {
    flex: 1;
    min-width: 0;
  }

  .btn_remove {
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.125rem;
  }

  .btn {
    max-width: 8.5rem;
  }

  .plus {
    display: block;
    margin-right: 0.25rem;
  }
</style>
