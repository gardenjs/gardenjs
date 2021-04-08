<script> 
  export let componentmap = {}

let component
let das = {}
let selectedExample = {}
let redirectdata = {}

window.addEventListener('message', (evt) => {
  selectedExample = evt.data.selectedExample || {}
  das = evt.data.das || {}
  redirectdata = {}
  component = evt.data.componentname ? componentmap[evt.data.componentname] : undefined
  console.log(evt.data.componentname, componentmap, component)
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

<div class="full">
{#if component}
  <svelte:component this={component} {...selectedExample.input} {...redirectdata} on:out={handlecomponentout} />
{/if}
</div>

