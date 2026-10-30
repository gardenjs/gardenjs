<script>
  import { onMount } from 'svelte'
  import { calculateInspectorBox } from './inspector.utils.js'
  import InspectorElementPane from './InspectorElementPane.svelte'

  let { appTheme, onInspectorElementsChanged, fixedElementBoxes } = $props()
  let currentHoveredElement = $state()
  let currentElementBox = $state()

  const calcEntries = (entries) => {
    const updatedFixedElementBoxes = entries.map((element) => {
      return {
        ...calculateInspectorBox(
          element.htmlElement,
          document.body.scrollTop,
          document.body.scrollLeft
        ),
        id: element.id,
      }
    })

    onInspectorElementsChanged(updatedFixedElementBoxes)
  }

  let resizeObserver

  onMount(() => {
    resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((_) => {
        calcEntries(fixedElementBoxes)
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
      currentElementBox = null
    } else if (currentHoveredElement !== elements[1]) {
      currentHoveredElement = elements[1]
      currentElementBox = calculateInspectorBox(
        elements[1],
        document.body.scrollTop,
        document.body.scrollLeft
      )
    }
  }

  const handleRightClick = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()

    let updatedFixedElementBoxes = []

    if (
      !fixedElementBoxes
        .map((box) => box.htmlElement)
        .includes(currentHoveredElement)
    ) {
      resizeObserver.observe(currentHoveredElement)
      updatedFixedElementBoxes = [
        ...fixedElementBoxes,
        { id: crypto.randomUUID(), htmlElement: currentHoveredElement },
      ]
    } else {
      updatedFixedElementBoxes = fixedElementBoxes.filter(
        (el) => el.htmlElement !== currentHoveredElement
      )
    }
    calcEntries(updatedFixedElementBoxes)
  }
</script>

<div class="overlay" oncontextmenu={handleRightClick}>
  {#each fixedElementBoxes as fixedElementBox, index (index)}
    <InspectorElementPane {...fixedElementBox} {appTheme} fixed={true} />
  {/each}
  <InspectorElementPane {...currentElementBox} {appTheme} />
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
