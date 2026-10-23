<script>
  import InspectorInfoBox from '../inspector/InspectorInfoBox.svelte'

  let { inspectorElements, appTheme, onUnpinInspectorElement } = $props()
</script>

<div class="infobox-grid">
  {#each inspectorElements as element, index (index)}
    <InspectorInfoBox
      id={element.id}
      element={element.content}
      theme={appTheme}
      position={element.position}
      variant="panel"
      showUnpin={true}
      {onUnpinInspectorElement}
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
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
  }
  @container (min-width: 2000px) {
    .infobox-grid {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
  }
</style>
