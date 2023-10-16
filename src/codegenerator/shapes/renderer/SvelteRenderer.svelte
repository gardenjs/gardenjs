<script>
  export let componentMap
  export let componentName
  export let selectedExample
  export let das

  $: component = componentMap?.[componentName] || componentMap?.Welcome

  let redirectData = {}
  $: {
    if (selectedExample) {
      redirectData = {}
    }
  }

  function handleComponentOut(evt) {
    if (das.out) {
      das.out.forEach((out) => {
        if (evt.detail[out.name]) {
          console.log(evt.detail[out.name])
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
