<script> 
  export let componentMap = {}
  export let dasMap = {}
  export let config

  let component
  let das = {}
  let selectedExample = {}
  let redirectdata = {}
  let full = false

  window.addEventListener('message', (evt) => {
    if (config.themeHandler) {
      config.themeHandler(evt.data.theme)
    }
    full = evt.data.stageSize === 'full'
    das = dasMap[evt.data.componentName] 
    selectedExample = das?.examples.find(ex => ex.story === evt.data.selectedExample)
    redirectdata = {}
    component = evt.data.componentName ? componentMap[evt.data.componentName] : componentMap.Welcome
  })

  function handlecomponentout(evt) {
    if (das.out) {
      das.out.forEach(out => {
        if (evt.detail[out.name]) {
          console.log(evt.detail[out.name])
          if (selectedExample.redirect && selectedExample.redirect[out.name]) {
            const input = selectedExample.redirect[out.name]
            redirectdata[input] = evt.detail[out.name]
          }
        }
      })
    }
  }
</script>

{#if component}
<div class:full>
  <svelte:component this={component} {...selectedExample?.input} {...redirectdata} on:out={handlecomponentout} />
</div>
{/if}

<style>
  .full {
    padding: 1rem 1rem 0;
  }
</style>
