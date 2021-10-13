<script> 
import HorizontalSplitPane from '../layouts/splitpane/HorizontalSplitPane.svelte'
import TabsComponent from './tabs/TabsComponent.svelte'
import InputSelectionComponent from './InputSelectionComponent.svelte'

export let componentname
export let das = {}
export let historystate

let selectedExample = {}
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
    myframe.contentWindow.postMessage({selectedExample, das, componentname}, window.location)
  }
}


$: {
  examples = das.examples || []
  selectedExample = examples[0] || {}
  if (historystate && historystate.selectedstory) {
    selectedExample = examples.find(ex => ex.story == historystate.selectedstory) || {}
  }
}

$: tabs = [
  {name: 'Description', props: {text: das.name}},
  {name: 'Examples', props: {selected: selectedExample.story, items: examples.map(ex => ex.story)}, page: InputSelectionComponent, out: handleSelectionChange},
]

$: selectedtab = tabs[0] || {}

    
function handleSelectionChange(evt) {
  globalThis.history.pushState({selectedstory: evt.detail.selecteditem}, '', window.location.pathname.substring('/garden'.length))
}

function tabselectionchange(evt) {
  selectedtab = evt.detail.selecteditem
}

let size = "100%"
function toggleMobile() {
  size = size == "100%" ? "642px" : "100%"
  if (size != "100%") {
    
  }
}
function toggleTablet() {
  size = size == "100%" ? "820px" : "100%"
  if (size != "100%") {

  }
}
function toggleLaptop() {
  size = size == "100%" ? "1280px" : "100%"
  if (size != "100%") {

  }
}
function toggleFull() {
  size = size == "100%" ? "0" : "100%"
  if (size != "100%") {

  }
}

</script>


<HorizontalSplitPane topheight='65vh'>
<div slot="top" class="full flex-column">
  <div class="actionbar">
    <h1 class="title__h1">{das.name}</h1>
    <div class="framesize-nav">
      <button on:click={toggleMobile} >
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#currentColor"><path d="M15.5 1h-8A2.5 2.5 0 005 3.5v17A2.5 2.5 0 007.5 23h8a2.5 2.5 0 002.5-2.5v-17A2.5 2.5 0 0015.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z"/></svg>
      </button>
      <button on:click={toggleTablet} >
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#currentColor"><path d="M18.5 0h-14A2.5 2.5 0 002 2.5v19A2.5 2.5 0 004.5 24h14a2.5 2.5 0 002.5-2.5v-19A2.5 2.5 0 0018.5 0zm-7 23c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm7.5-4H4V3h15v16z"/></svg>
      </button>
      <button on:click={toggleLaptop} >
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#currentColor"><path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/></svg>
      </button>
      <button on:click={toggleFull} >
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#currentColor"><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z"/></svg>
      </button>
    </div>
  </div>
  <iframe class="myframe" title="preview" bind:this={myframe} src="/garden/gardenframe/" style="width: {size}; height: {size}"></iframe>
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
    {:else if selectedtab.name == 'CSS'}
      <h2>CSS...</h2>
    {:else if selectedtab.name == 'HTML'}
      <h2>HTML...</h2>
    {/if}
  </TabsComponent>
</div>
</HorizontalSplitPane>
