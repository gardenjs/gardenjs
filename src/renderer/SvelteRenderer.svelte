<script>
  import { onMount } from 'svelte'
  export let componentMap
  export let componentName
  export let selectedExample
  export let das
  export let afterRenderHook = () => {}

  let component

  let redirectData = {}
  $: {
    if (selectedExample) {
      redirectData = {}
    }
  }

  $: {
    updateState(das, selectedExample, componentMap)
  }

  async function updateState(das, selectedExample, componentMap) {
    component = componentMap?.[componentName] || componentMap?.Welcome
  }

  onMount(async () => {
    await afterRenderHook()
  })

  function handleComponentOut(evt) {
    if (das.out) {
      das.out.forEach((out) => {
        if (evt.detail[out.name]) {
          if (selectedExample.redirect && selectedExample.redirect[out.name]) {
            const input = selectedExample.redirect[out.name]
            redirectData[input] = evt.detail[out.name]
          }
        }
      })
    }
  }
</script>

<svelte:component
  this={component}
  {...selectedExample?.input}
  {...redirectData}
  on:out={handleComponentOut}
/>
