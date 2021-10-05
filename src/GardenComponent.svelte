<script> 

export let componentmap
export let routes

let urlParams = new URLSearchParams(window.location.search);
let currentPath = window.location.pathname.substring('direct/'.length)

let currentRoute = routes[currentPath]
let story = decodeURI(urlParams.get('story'))

console.log(currentRoute, currentPath, story, 'HIHU')

let component
let das 
let selectedExample = {}
let redirectdata = {}

$: {
  if (currentRoute) {
    das = currentRoute.das
    component = componentmap[currentRoute.fullname]
  }
  if (das) {
    selectedExample = das.examples.find(ex => {
      console.log('IS', ex.story, story, ex.story == story)
      return ex.story == story
    })
  }
}

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

