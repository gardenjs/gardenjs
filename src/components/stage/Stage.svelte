<script> 
import { createEventDispatcher} from 'svelte'
import HorizontalSplitPane from '../splitpanes/HorizontalSplitPane.svelte'
import PanelComponent from '../panel/PanelComponent.svelte'
import PanelStoriesNav from '../panel/PanelStoriesNav.svelte'
import PanelDescription from '../panel/PanelDescription.svelte'
import {computeStageStyle} from '../../stageSizes.js'
import Highlight from '../highlight/Highlight.svelte'

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

$: tabs = createTabs(das)

function createTabs(das) {
  const tabs = []
  if (das.description) {
    tabs.push({name: 'Description', props: {das}, page: PanelDescription })
  }
  tabs.push( {name: 'Examples', props: {selected: selectedStory, items: examples.map(ex => ex.story)}, page: PanelStoriesNav, out: handleSelectionChange} )
  return tabs
}

$: selectedtab = tabs[0] || {}

    
function handleSelectionChange(evt) {
  globalThis.history.pushState({selectedstory: evt.detail.selecteditem}, '', window.location.pathname.substring('/garden'.length))
}

function tabselectionchange(evt) {
  selectedtab = evt.detail.selecteditem
}

</script>

<Highlight das="{das}" />
<HorizontalSplitPane topheight='65vh'>
  <div slot="top" class="is-full">
    <iframe class="stage" title="preview" bind:this={myframe} src="/garden/gardenframe/" style={stageStyle}></iframe>
  </div>
  <div slot="bottom" class="is-full is-flex-column">
    <PanelComponent tabs={tabs} on:out={tabselectionchange} />
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
