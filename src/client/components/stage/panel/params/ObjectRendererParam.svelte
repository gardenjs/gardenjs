<script>
  let { value, onChange, schema = {} } = $props()

  function addItem() {
    const newItem = {}
    Object.keys(schema).forEach((key) => {
      newItem[key] = schema[key].default ?? ''
    })
    const newArray = [...(value || []), newItem]
    onChange(newArray)
  }

  function removeItem(index) {
    const newArray = [...value]
    newArray.splice(index, 1)
    onChange(newArray)
  }

  function updateItemProperty(index, propertyKey, newValue) {
    const newArray = [...value]
    newArray[index] = { ...newArray[index], [propertyKey]: newValue }
    onChange(newArray)
  }

  let items = $derived(Array.isArray(value) ? value : [])
</script>

<div class="items">
  {#if items.length > 0}
    {#each items as item, index (index)}
      <div class="item">
        <div class="item_header">
          <span class="item_number">#{index + 1}</span>
          <button
            class="btn btn_remove"
            title="Remove item"
            aria-label="Remove item"
            onclick={() => removeItem(index)}
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
        <div class="grid">
          {#each Object.entries(schema) as [key, config] (key)}
            <div class="label">
              <div class="field-label">{config.label || key}</div>
            </div>
            <div class="input_wrapper">
              <input
                class="input"
                type="text"
                value={item[key] ?? ''}
                placeholder={config.placeholder || ''}
                oninput={(e) =>
                  updateItemProperty(index, key, e.currentTarget.value)}
              />
            </div>
          {/each}
        </div>
      </div>
    {/each}
  {/if}
  <button class="btn btn_add" onclick={addItem}>
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
    Add Item
  </button>
</div>

<style>
  @import './input.scss';
  @import './button.scss';

  .items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .item {
    border-left: 1px solid var(--c-basic-250);
    padding: 0 0.75rem 0.75rem;
    background: var(--c-basic-0);
  }

  .item_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .item_number {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--c-basic-600);
  }

  .grid {
    display: grid;
    grid-template-columns: minmax(120px, auto) 1fr;
    gap: 0.75rem;
    align-items: start;
  }
  .label {
    font-size: 0.938rem;
    font-weight: 500;
    color: var(--c-basic-700);
    max-width: 220px;
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

  .btn_add {
    max-width: 8.5rem;
  }

  .plus {
    display: block;
    margin-right: 0.25rem;
  }
</style>
