<script>
  let { value, onChange } = $props()

  function colorToHex(color) {
    if (!color) return '#000000'

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

  let hexValue = $derived(colorToHex(value))
  let showPreview = $derived(hasTransparency(value))
</script>

<div class="row">
  <input
    type="color"
    value={hexValue}
    oninput={(e) => onChange(e.currentTarget.value)}
  />
  {#if showPreview}
    <div
      class="alpha-preview"
      style:background-color={value || '#000000'}
    ></div>
  {/if}
  <input
    type="text"
    value={value || '#000000'}
    oninput={(e) => onChange(e.currentTarget.value)}
  />
</div>

<style>
  @import './styles.scss';

  .row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  input[type='color'] {
    width: 2.5rem;
    height: 1.469rem;
    padding: 0;
    border: none;
    border-radius: 0.125rem;
    cursor: pointer;
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
  input[type='text'] {
    max-width: 12.5rem;
  }
</style>
