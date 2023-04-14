<script> 
export let componentMap = {}
export let dasMap = {}
export let config

let component = componentMap.Welcome
let das = {}
let selectedExample = {}
let redirectdata = {}

window.addEventListener('message', (evt) => {
  if (config.themeHandler) {
    config.themeHandler(evt.data.theme)
  }
  das = dasMap[evt.data.componentName] 
  selectedExample = das?.examples.find(ex => ex.story === evt.data.selectedStory)
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
  <svelte:component this={component} {...selectedExample?.input} {...redirectdata} on:out={handlecomponentout} />
{:else}
  <Welcome />
{/if}

