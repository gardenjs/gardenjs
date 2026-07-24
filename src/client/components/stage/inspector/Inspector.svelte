<script>
  import { onMount } from 'svelte'
  import InspectorElementPane from './InspectorElementPane.svelte'

  let { appTheme } = $props()
  let overlay
  let currentHoveredElement = $state()
  let fixedElements = $state([])

  let resizeObserver
  let show = $state(false)
  onMount(() => {
    resizeObserver = new ResizeObserver((entries) => {
      show = false
      entries.forEach((_) => {})
      setTimeout(() => {
        show = true
      })
    })
    window.addEventListener('mousemove', updateHoveredElement)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('mousemove', updateHoveredElement)
    }
  })

  const updateHoveredElement = (evt) => {
    const elements = document.elementsFromPoint(evt.x, evt.y)
    if (elements.length < 5) {
      currentHoveredElement = null
    } else if (currentHoveredElement !== elements[1]) {
      currentHoveredElement = elements[1]
    }
  }

  const handleRightClick = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    if (!fixedElements.includes(currentHoveredElement)) {
      resizeObserver.observe(currentHoveredElement)
      fixedElements.push(currentHoveredElement)
    } else {
      fixedElements = fixedElements.filter((el) => el !== currentHoveredElement)
    }
  }
</script>

<div bind:this={overlay} class="overlay" oncontextmenu={handleRightClick}>
  {#if show}
    {#each fixedElements as fixedElement, index (index)}
      <InspectorElementPane element={fixedElement} {appTheme} fixed={true} />
    {/each}
  {/if}
  <InspectorElementPane element={currentHoveredElement} {appTheme} />
</div>

<style>
  .overlay {
    background-color: transparent;
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 999999;
    overflow: hidden;
    box-sizing: border-box;
  }
</style>
