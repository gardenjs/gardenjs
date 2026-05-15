<script>
  import InspectorInfoBox from '../InspectorInfoBox.svelte'

  function rand() {
    return Math.floor(Math.random() * 1000)
  }

  function createElement() {
    return {
      width: rand(),
      height: rand(),
      gap: rand(),
      columnGap: rand(),
      rowGap: rand(),
      margin: {
        top: rand(),
        right: rand(),
        bottom: rand(),
        left: rand(),
      },
      padding: {
        top: rand(),
        right: rand(),
        bottom: rand(),
        left: rand(),
      },
      tagName: 'div',
      classList: ['classA', 'classB', 'classC'],
    }
  }

  const elements = [
    { element: createElement(), theme: 'light' },
    { element: createElement(), theme: 'light' },
    { element: createElement(), theme: 'light' },
    { element: createElement(), theme: 'light' },
    { element: createElement(), theme: 'light' },
    { element: createElement(), theme: 'dark' },
    { element: createElement(), theme: 'dark' },
    { element: createElement(), theme: 'dark' },
    { element: createElement(), theme: 'dark' },
    { element: createElement(), theme: 'dark' },
  ]
</script>

<div class="infobox-grid">
  {#each elements as element, index (index)}
    <InspectorInfoBox
      element={element.element}
      theme={element.theme}
      position={element.position}
      variant="panel"
      showUnpin={true}
    />
  {/each}
</div>

<style>
  .infobox-grid {
    container-type: inline-size;
    width: 100%;
    padding: 0.75rem;
    display: grid;
    gap: 0.75rem;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 25rem), 1fr));
  }
  @container (min-width: 2000px) {
    .infobox-grid {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
  }
  .infobox-grid :global(.infobox) {
    width: 100%;
    min-width: 0;
  }
</style>
