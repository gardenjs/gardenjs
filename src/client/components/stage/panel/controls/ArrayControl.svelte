<script>
  import ArrayControl from './ArrayControl.svelte'
  import BooleanControl from './BooleanControl.svelte'
  import ColorPickerControl from './ColorPickerControl.svelte'
  import DateControl from './DateControl.svelte'
  import DatetimeControl from './DatetimeControl.svelte'
  import MultiselectControl from './MultiselectControl.svelte'
  import NumberControl from './NumberControl.svelte'
  import ObjectControl from './ObjectControl.svelte'
  import RangeControl from './RangeControl.svelte'
  import SelectControl from './SelectControl.svelte'
  import TextInputControl from './TextInputControl.svelte'
  import TimeControl from './TimeControl.svelte'

  let { value, onChange, schema = {} } = $props()

  function addItem() {
    const newItem = {}
    Object.keys(schema).forEach((key) => {
      const fieldType = getFieldType(schema[key])
      if (fieldType === 'array' || fieldType === 'multiselect') {
        newItem[key] = []
      } else if (fieldType === 'boolean') {
        newItem[key] = undefined
      } else if (fieldType === 'number' || fieldType === 'range') {
        newItem[key] = null
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
  let isUnset = $derived(value === undefined || value === null)
</script>

<div class="row">
  <div class="container">
    <div class="items">
      {#if items.length > 0}
        {#each items as item, index (index)}
          <div class="item">
            <div class="item_header">
              <span class="item_number">#{index + 1}</span>
              <div class="item_header_actions">
                <button
                  type="button"
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
            </div>
            <div class="grid">
              {#each Object.entries(schema) as [key, config] (key)}
                {@const fieldType = getFieldType(config)}
                <div class="label">
                  <div class="field-label">{config.label || key}</div>
                </div>
                <div class="input_wrapper">
                  {#if fieldType === 'array'}
                    <ArrayControl
                      value={item[key] ?? []}
                      onChange={(v) => updateItemProperty(index, key, v)}
                    />
                  {:else if fieldType === 'boolean'}
                    <BooleanControl
                      value={item[key] ?? undefined}
                      onChange={(v) => updateItemProperty(index, key, v)}
                    />
                  {:else if fieldType === 'color'}
                    <ColorPickerControl
                      value={item[key] ?? undefined}
                      onChange={(v) => updateItemProperty(index, key, v)}
                    />
                  {:else if fieldType === 'date'}
                    <DateControl
                      value={item[key] ?? undefined}
                      onChange={(v) => updateItemProperty(index, key, v)}
                    />
                  {:else if fieldType === 'datetime'}
                    <DatetimeControl
                      value={item[key] ?? undefined}
                      onChange={(v) => updateItemProperty(index, key, v)}
                    />
                  {:else if fieldType === 'multiselect'}
                    <MultiselectControl
                      value={item[key] ?? []}
                      onChange={(v) => updateItemProperty(index, key, v)}
                      options={config.options ?? []}
                      control={config.control ?? 'dropdown'}
                    />
                  {:else if fieldType === 'number'}
                    <NumberControl
                      value={item[key] ?? null}
                      onChange={(v) => updateItemProperty(index, key, v)}
                    />
                  {:else if fieldType === 'object'}
                    <ObjectControl
                      value={item[key] ?? {}}
                      onChange={(v) => updateItemProperty(index, key, v)}
                      schema={config.schema ?? {}}
                    />
                  {:else if fieldType === 'range'}
                    <RangeControl
                      value={item[key] ?? null}
                      min={config.min}
                      max={config.max}
                      step={config.step}
                      onChange={(v) => updateItemProperty(index, key, v)}
                    />
                  {:else if fieldType === 'select'}
                    <SelectControl
                      value={item[key] ?? undefined}
                      onChange={(v) => updateItemProperty(index, key, v)}
                      options={config.options ?? []}
                    />
                  {:else if fieldType === 'time'}
                    <TimeControl
                      value={item[key] ?? undefined}
                      onChange={(v) => updateItemProperty(index, key, v)}
                    />
                  {:else}
                    <TextInputControl
                      value={item[key] ?? ''}
                      control={config.control ?? 'text'}
                      numberOfRows={config.numberOfRows}
                      onChange={(v) => updateItemProperty(index, key, v)}
                    />
                  {/if}
                </div>
              {/each}
            </div>
          </div>
        {/each}
      {/if}
      <div class="actions">
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
            stroke-linejoin="round"
            ><path d="M5 12h14" /><path d="M12 5v14" /></svg
          >
          <span class="btn-label">Add Item</span>
        </button>
        <div class="unset-area">
          {#if !isUnset}
            <button
              type="button"
              class="btn btn_unset_action"
              title="Unset"
              aria-label="Unset"
              onclick={() => onChange?.(undefined)}
            >
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
              <span class="btn-label">Unset</span>
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  @import './button.scss';

  .row {
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .container {
    flex: 1;
    min-width: 0;
  }

  .items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    --delete-col-width: 4.75rem;
  }

  .item {
    border-left: 1px solid var(--c-basic-250);
    padding: 0 0 0 0.75rem;
    background: var(--c-basic-0);
  }

  .item_header {
    display: grid;
    grid-template-columns: 1fr var(--delete-col-width);
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .item_header_actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: var(--delete-col-width);
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

  .actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .unset-area {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .btn_unset_action {
    max-width: 8.5rem;
  }

  .btn_unset_action .close {
    margin-right: 0.25rem;
  }
</style>
