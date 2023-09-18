<script> 
import { createEventDispatcher} from 'svelte'
import HorizontalSplitPane from '../splitpanes/HorizontalSplitPane.svelte'
import PanelComponent from './panel/PanelComponent.svelte'
import PanelStoriesNav from './panel/PanelStoriesNav.svelte'
import PanelDescription from './panel/PanelDescription.svelte'
import PanelCode from './panel/PanelCode.svelte'

const dispatch = createEventDispatcher()

export let componentName
export let das = {}
export let stageStyle
export let stageSize
export let selectedExample
export let expressbaseurl

function updateStageRect(stageRect) {
  dispatch('out', {
    stageRect,
  })
}

let myframeready 
let myframe

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
        // @ts-ignore
        evt.pageX = event.clientX + boundingClientRect.left;
        // @ts-ignore
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
    myframe.contentWindow.postMessage({selectedExample, componentName, stageSize}, window.location)
  }
}

$: tabs = createTabs(das)

function createTabs(das) {
  const tabs = []
  if (das.description) {
    tabs.push({name: 'Description', props: {das}, page: PanelDescription })
  }
  if (das.examples?.length) {
    tabs.push( {name: 'Examples', props: {selected: selectedExample, items: das.examples.map(ex => ex.story)}, page: PanelStoriesNav, out: handleSelectionChange} )
  }
  if (das.componentfile) { 
    tabs.push( {name: 'Code', props: {das, expressbaseurl}, page: PanelCode} )
  }
  return tabs
}

function handleSelectionChange(evt) {
  globalThis.history.pushState({selectedstory: evt.detail.selecteditem}, '', window.location.pathname.substring('/garden'.length))
}

</script>

<HorizontalSplitPane topheight='65vh'>
  <div slot="top" class="is-full">
    <iframe class="stage" title="preview" bind:this={myframe} src="/.garden/gardenframe/" style={stageStyle}></iframe>
  </div>
  <div slot="bottom" class="is-full is-flex-column">
    <PanelComponent tabs={tabs} />
  </div>
</HorizontalSplitPane>

<style>
.stage {
  align-self: center;
  margin: auto;
  display: block;
  height: 100%;
  width: 100%;
  background-color: var(--c-base-0);
}
</style>
