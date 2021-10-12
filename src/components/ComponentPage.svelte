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
function toggleSize() {
  size = size == "100%" ? "500px" : "100%"
  if (size != "100%") {

  }
}

</script>


<HorizontalSplitPane topheight='65vh'>
<div slot="top" class="full flex-column">
  <div class="flex-row gardenframetopbar">
    <h1 class="h1">{das.name}</h1>
    <button on:click={toggleSize} >togglesize</button>
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

<style>
  .h1 {
    color: #333;
    font-size: 1.2em;
    font-weight: 800;
    padding: 0 0 5px;
  }
  .myframe {
    align-self: center;
    display: blocK;
    height: 100%;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ababab;
    border-bottom: none;
    border-radius: 2px;
  }
  .gardenframetopbar {
    align-items: flex-start;
    justify-content: space-between;
    height: 25px;
  }
</style>
