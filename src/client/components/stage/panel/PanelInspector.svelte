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

<div class="flex">
  {#each elements as element, index (index)}
    <InspectorInfoBox
      element={element.element}
      theme={element.theme}
      position={element.position}
      showUnpin={true}
    />
  {/each}
</div>

<style>
  .flex {
    width: 100%;
    padding: 12px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;
  }
</style>
