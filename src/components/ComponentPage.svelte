<script> 
import HorizontalSplitPane from '../layouts/splitpane/HorizontalSplitPane.svelte'
import TabsComponent from './tabs/TabsComponent.svelte'
import InputSelectionComponent from './InputSelectionComponent.svelte'

export let componentname
export let das = {}
export let historystate

let selectedStory = null 
let examples = {}

let myframeready 
let myframe

$: {
  if (myframe) {
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


$: {
  examples = das.examples || []
  selectedStory = examples[0]?.story 
  if (historystate && historystate.selectedstory) {
    selectedStory = examples.find(ex => ex.story == historystate.selectedstory)?.story
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

let frameheight = '100%'
let framewidth = '100%'
let framesize = 'full'
function setFramesizeMobile() {
  frameheight = '1170px'
  framewidth = '550px'
  framesize = 'small'
}
function setFramesizeFullTablet() {
  frameheight = '1080px'
  framewidth = '810px'
  framesize = 'medium'
}
function setFramesizeFullDesktop() {
  frameheight = '960px'
  framewidth = '1536px'
  framesize = 'large'
}
function setFramesizeFull() {
  frameheight = '100%'
  framewidth = '100%'
  framesize = 'full'
}
let landscape = false 
function toggleOrientation() {
  landscape = !landscape
}
let style = ""
$: {
  if (landscape) {
    style = `width: ${frameheight}; height: ${framewidth};`
  } else {
    style = `width: ${framewidth}; height: ${frameheight};`
  }
}

</script>


<HorizontalSplitPane topheight='65vh'>
<div slot="top" class="full flex-column">
  <div class="actionbar">
    <h1 class="title__h1">{das.name}</h1>
    <div class="framesize-nav">
      <button on:click={setFramesizeMobile} rel="Small" class="tooltip" class:active={framesize === 'small'} >
        <svg xmlns="http://www.w3.org/2000/svg" class:landscape={landscape} height="24" viewBox="0 0 24 24" width="24" fill="#currentColor"><path d="M15.5 1h-8A2.5 2.5 0 005 3.5v17A2.5 2.5 0 007.5 23h8a2.5 2.5 0 002.5-2.5v-17A2.5 2.5 0 0015.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z"/></svg>
      </button>
      <button on:click={setFramesizeFullTablet} rel="Medium" class="tooltip" class:active={framesize === 'medium'} >
        <svg xmlns="http://www.w3.org/2000/svg" class:landscape={landscape} height="24" viewBox="0 0 24 24" width="24" fill="#currentColor"><path d="M18.5 0h-14A2.5 2.5 0 002 2.5v19A2.5 2.5 0 004.5 24h14a2.5 2.5 0 002.5-2.5v-19A2.5 2.5 0 0018.5 0zm-7 23c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm7.5-4H4V3h15v16z"/></svg>
      </button>
      <button on:click={setFramesizeFullDesktop} rel="Large" class="tooltip" class:active={framesize === 'large'} >
        <svg xmlns="http://www.w3.org/2000/svg" class:landscape={landscape} height="24" viewBox="0 0 24 24" width="24" fill="#currentColor"><path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/></svg>
      </button>
      <button on:click={setFramesizeFull} rel="Full" class="tooltip" class:active={framesize === 'full'} >
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#currentColor"><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z"/></svg>
      </button>
      <button on:click={toggleOrientation} rel="Toggle Portrait/Landscape" class="tooltip">
        <svg xmlns="http://www.w3.org/2000/svg" class:landscape={landscape} height="24" viewBox="0 0 24 24" width="24" fill="#currentColor"><path d="M16.48 2.52c3.27 1.55 5.61 4.72 5.97 8.48h1.5C23.44 4.84 18.29 0 12 0l-.66.03 3.81 3.81 1.33-1.32zm-6.25-.77a1.49 1.49 0 00-2.12 0L1.75 8.11a1.49 1.49 0 000 2.12l12.02 12.02c.59.59 1.54.59 2.12 0l6.36-6.36c.59-.59.59-1.54 0-2.12L10.23 1.75zm4.6 19.44L2.81 9.17l6.36-6.36 12.02 12.02-6.36 6.36zm-7.31.29A10.487 10.487 0 011.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32z"/></svg>
      </button>
    </div>
  </div>
  <iframe class="stage whitebg" title="preview" bind:this={myframe} src="/garden/gardenframe/" style={style} ></iframe>
</div>
<div slot="bottom" class="full flex-column">
  <TabsComponent tabs={tabs} on:out={tabselectionchange}>
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
  </TabsComponent>
</div>
</HorizontalSplitPane>

<style>
.full {
  height: 100%;
  width: auto;
  overflow-y: auto;
}
.flex-column {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.stage {
  align-self: center;
  display: blocK;
  height: 100%;
  width: 100%;
  background-color: var(--white);
  border: 1px solid var(--gray-900);
}
.whitebg {
  background-color: white;
}
</style>
