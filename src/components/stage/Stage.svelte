<script> 
import { createEventDispatcher} from 'svelte'
import HorizontalSplitPane from '../splitpanes/HorizontalSplitPane.svelte'
import PanelComponent from '../panel/PanelComponent.svelte'
import InputSelectionComponent from '../panel/PanelStoriesNav.svelte'
import {computeStageStyle} from '../../stageSizes.js'

const dispatch = createEventDispatcher()

export let componentname
export let das = {}
export let historystate
export let stageSize
export let landscape
export let examples
export let selectedStory
export let theme 

function updateStageRect(stageRect) {
  dispatch('out', {
    stageRect,
  })
}

let myframeready 
let myframe

$: stageStyle = computeStageStyle({stageSize, landscape, stageBg: theme?.stageBg})

const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach(entry => {
    updateStageRect(entry.contentRect)
  })
})


$: {
  if (myframe) {
    resizeObserver.observe(myframe)
    myframe.contentWindow.onload = () => {
      myframeready = true
    }
    myframe.contentWindow.addEventListener('mousemove', function( event ) {
        var boundingClientRect = myframe.getBoundingClientRect();
        var evt = new CustomEvent( 'mousemove', {bubbles: true, cancelable: false})
        evt.pageX = event.clientX + boundingClientRect.left;
        evt.pageY = event.clientY + boundingClientRect.top;
        myframe.dispatchEvent( evt );
    });
    myframe.contentWindow.addEventListener('mouseup', function( event ) {
        var evt = new CustomEvent( 'mouseup', {bubbles: true, cancelable: false})
        myframe.dispatchEvent( evt );
    });
  }
}

$: {
  if (myframeready) {
    myframe.contentWindow.postMessage({selectedStory, componentname}, window.location)
  }
}

$: tabs = [
  {name: 'Description', props: {text: das.name}},
  {name: 'Examples', props: {selected: selectedStory, items: examples.map(ex => ex.story)}, page: InputSelectionComponent, out: handleSelectionChange},
]

$: selectedtab = tabs[0] || {}

    
function handleSelectionChange(evt) {
  globalThis.history.pushState({selectedstory: evt.detail.selecteditem}, '', window.location.pathname.substring('/garden'.length))
}

function tabselectionchange(evt) {
  selectedtab = evt.detail.selecteditem
}



</script>


<HorizontalSplitPane topheight='65vh'>
<div slot="top" class="is-full">
	<iframe class="stage" title="preview" bind:this={myframe} src="/garden/gardenframe/" style={stageStyle} ></iframe>
</div>
<div slot="bottom" class="is-full is-flex-column">
  <PanelComponent tabs={tabs} on:out={tabselectionchange}>
    {#if selectedtab.name == 'Description'}
      <h2>{das.name}</h2>
      <p><b>Info:</b> {@html das.description}</p>
      <div>Input</div>
      <ul>
      {#if das.in}
      {#each das.in as inp}
        <li>{inp.name}: {inp.type}</li>
      {/each}
      {/if}
      </ul>
      
      <div>Output</div>
      <ul>
      {#if das.out}
      {#each das.out as outp}
        <li>{outp.name}: {outp.type}</li>
      {/each}
      {/if}
      </ul>
    {/if}
  </PanelComponent>
</div>
</HorizontalSplitPane>

<style>
.stage {
  align-self: center;
  margin: auto;
  display: block;
  height: 100%;
  width: 100%;
  background-color: var(--c-white);
  /* border: 1px solid var(--c-basic-400); */
}
</style>
