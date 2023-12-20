<script>
  import { onDestroy, onMount, beforeUpdate, afterUpdate } from 'svelte'
  export let componentMap
  export let componentName
  export let selectedExample
  export let das

  let unmountFn

  $: component = componentMap?.[componentName] || componentMap?.Welcome

  let redirectData = {}
  $: {
    if (selectedExample) {
      redirectData = {}
    }
  }

  $: {
    updateState(das, selectedExample)
  }

  async function updateState(das, selectedExample) {
    console.log('DEBUG', 'update state')
    if (unmountFn) {
      console.log('DEBUG', 'call unmount update state')
      unmountFn()
      unmountFn = undefined
    }
    if (das?.beforeEach) {
      unmountFn = await das.beforeEach()
    }
  }

  onDestroy(() => {
    console.log('DEBUG', 'on destroy')
    if (unmountFn) {
      console.log('DEBUG', 'call unmount on destroy')
      unmountFn()
      unmountFn = undefined
    }
  })
  onMount(() => {
    console.log('DEBUG', 'on mount')
  })
  beforeUpdate(() => {
    console.log('DEBUG', 'before update')
    if (unmountFn) {
      console.log('DEBUG', 'call unmount before update')
      unmountFn()
    }
    unmountFn = undefined
  })

  afterUpdate(() => {
    console.log('DEBUG', 'after update')
  })

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
