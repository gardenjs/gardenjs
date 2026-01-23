<script>
  let { value, onChange } = $props()

  function addItem() {
    const newArray = [...(value || []), '']
    onChange(newArray)
  }

  function removeItem(index) {
    const newArray = [...value]
    newArray.splice(index, 1)
    onChange(newArray)
  }

  function updateItem(index, newValue) {
    const newArray = [...value]
    newArray[index] = newValue
    onChange(newArray)
  }
</script>

<div class="array-param">
  {#if Array.isArray(value) && value.length > 0}
    {#each value as item, index (index)}
      <div class="array-item">
        <input
          type="text"
          value={JSON.stringify(item ?? '')}
          onblur={(e) => updateItem(index, JSON.parse(e.currentTarget.value))}
        />
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
    {/each}
  {/if}
  <button class="btn" onclick={addItem}>
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
  @import './styles.scss';

  .array-param {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    width: 100%;
  }

  .array-item {
    display: flex;
    gap: 0.25rem;
    align-items: center;
  }

  .array-item input {
    flex: 1;
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
    max-width: 6.5rem;
  }

  .plus {
    display: block;
    margin-right: 0.25rem;
  }
</style>
