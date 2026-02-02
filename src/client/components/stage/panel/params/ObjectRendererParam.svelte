<script>
  import BooleanParam from './BooleanParam.svelte'
  import NumberParam from './NumberParam.svelte'
  import ColorPickerParam from './ColorPickerParam.svelte'
  import TextInputParam from './TextInputParam.svelte'
  import SelectParam from './SelectParam.svelte'
  import ArrayParam from './ArrayParam.svelte'
  import ObjectParam from './ObjectParam.svelte'

  let { value, onChange, schema = {} } = $props()

  function addItem() {
    const newItem = {}
    Object.keys(schema).forEach((key) => {
      const fieldType = getFieldType(schema[key])
      if (fieldType === 'boolean') {
        newItem[key] = undefined
      } else if (fieldType === 'number') {
        newItem[key] = null
      } else if (fieldType === 'array') {
        newItem[key] = []
      } else if (fieldType === 'object') {
        newItem[key] = {}
      } else {
        newItem[key] = undefined
      }
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

  const getFieldType = (config) => String(config?.type ?? 'text').toLowerCase()

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
              viewBox="0 0 24 24"
              height="16"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><path
                d="M10 11v6m4-6v6m5-11v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"
              /></svg
            >
          </button>
        </div>
        <div class="grid">
          {#each Object.entries(schema) as [key, config] (key)}
            {@const fieldType = getFieldType(config)}
            <div class="label">
              <div class="field-label">{config.label || key}</div>
            </div>
            <div class="input_wrapper">
              {#if fieldType === 'boolean'}
                <BooleanParam
                  value={item[key] ?? undefined}
                  onChange={(v) => updateItemProperty(index, key, v)}
                />
              {:else if fieldType === 'number'}
                <NumberParam
                  value={item[key] ?? null}
                  onChange={(v) => updateItemProperty(index, key, v)}
                />
              {:else if fieldType === 'color'}
                <ColorPickerParam
                  value={item[key] ?? undefined}
                  onChange={(v) => updateItemProperty(index, key, v)}
                />
              {:else if fieldType === 'select'}
                <SelectParam
                  value={item[key] ?? undefined}
                  onChange={(v) => updateItemProperty(index, key, v)}
                  options={config.options ?? []}
                />
              {:else if fieldType === 'array'}
                <ArrayParam
                  value={item[key] ?? []}
                  onChange={(v) => updateItemProperty(index, key, v)}
                />
              {:else if fieldType === 'object'}
                <ObjectParam
                  value={item[key] ?? {}}
                  onChange={(v) => updateItemProperty(index, key, v)}
                  schema={config.schema ?? {}}
                />
              {:else}
                <TextInputParam
                  value={item[key] ?? ''}
                  onChange={(v) => updateItemProperty(index, key, v)}
                />
              {/if}
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
