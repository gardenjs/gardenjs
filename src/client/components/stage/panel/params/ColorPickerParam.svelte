<script>
  let { value, onChange } = $props()

  function colorToHex(color) {
    if (!color) return '#ffffff'

    const str = String(color).trim()

    if (/^#[0-9A-Fa-f]{6}$/.test(str)) return str

    if (/^#[0-9A-Fa-f]{3}$/.test(str)) {
      return '#' + str[1] + str[1] + str[2] + str[2] + str[3] + str[3]
    }

    const temp = document.createElement('div')
    temp.style.color = str
    document.body.appendChild(temp)
    const computed = window.getComputedStyle(temp).color
    document.body.removeChild(temp)

    const match = computed.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
    if (match) {
      const [, r, g, b] = match
      return (
        '#' +
        [r, g, b].map((n) => parseInt(n).toString(16).padStart(2, '0')).join('')
      )
    }

    return '#000000'
  }

  function hasTransparency(color) {
    if (!color) return false
    const str = String(color).trim().toLowerCase()
    return /rgba\s*\(/.test(str) || /hsla\s*\(/.test(str)
  }

  function handleColorPickerClick() {
    if (isUnset) {
      onChange('#000000')
    }
  }

  function handleTextInput(e) {
    const newValue = e.currentTarget.value.trim()
    if (newValue === '') {
      onChange(undefined)
    } else {
      onChange(newValue)
    }
  }

  let isUnset = $derived(!value || value === undefined || value === null)
  let hexValue = $derived(colorToHex(value))
  let showPreview = $derived(hasTransparency(value))
</script>

<div class="row">
  <div class="color-picker-wrapper" class:picker-unset={isUnset}>
    <input
      class="input"
      type="color"
      value={hexValue}
      onfocus={handleColorPickerClick}
      oninput={(e) => onChange(e.currentTarget.value)}
    />
  </div>
  {#if showPreview}
    <div
      class="alpha-preview"
      style:background-color={value || '#000000'}
    ></div>
  {/if}
  <input
    class="input"
    type="text"
    value={value || ''}
    oninput={handleTextInput}
  />
  {#if isUnset}
    <span class="unset-info">is not set</span>
  {:else}
    <button class="btn_unset" onclick={() => onChange(undefined)}>
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
        stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg
      >
      unset
    </button>
  {/if}
</div>

<style>
  @import './button_unset.scss';
  @import './input.scss';

  .row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .color-picker-wrapper {
    position: relative;
    width: 2.5rem;
    height: 1.469rem;
    /* border: 1px solid var(--c-primary); */
    border-radius: 0.125rem;
    overflow: hidden;
  }

  .color-picker-wrapper.picker-unset {
    border: 1px solid var(--c-primary);
  }

  .color-picker-wrapper.picker-unset input[type='color'] {
    opacity: 0;
  }

  .color-picker-wrapper.picker-unset::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      150deg,
      transparent calc(50% - 1px),
      red calc(50% - 1px),
      red calc(50% + 1px),
      transparent calc(50% + 1px)
    );
    pointer-events: none;
    z-index: 1;
  }

  input[type='color'] {
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    border-radius: 0.125rem;
    cursor: pointer;
  }

  .input {
    max-width: 12.5rem;
  }
  .alpha-preview {
    width: 2.5rem;
    height: 1.469rem;
    border-radius: 0.125rem;
    background-image:
      linear-gradient(45deg, var(--c-basic-100) 25%, transparent 25%),
      linear-gradient(-45deg, var(--c-basic-100) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--c-basic-100) 75%),
      linear-gradient(-45deg, transparent 75%, var(--c-basic-100) 75%);
    background-size: 8px 8px;
    background-position:
      0 0,
      0 4px,
      4px -4px,
      -4px 0px;
    overflow: hidden;
  }
  input[type='color']::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  input[type='color']::-webkit-color-swatch {
    border: none;
    border-radius: 0.063rem;
  }
</style>
