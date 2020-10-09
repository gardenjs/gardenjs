<script> 
import HorizontalSplitPane from '../layouts/splitpane/HorizontalSplitPane.svelte'
import TabsComponent from './tabs/TabsComponent.svelte'
import InputSelectionComponent from './InputSelectionComponent.svelte'

export let componentname
export let das = {}

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
}

$: tabs = [
  {name: 'Description', props: {text: das.name}},
  {name: 'CSS', props: {text:'css'}},
  {name: 'HTML', props: {text:'html'} },
  {name: 'Examples', props: {selected: selectedExample.story, items: examples.map(ex => ex.story)}, page: InputSelectionComponent, out: handleSelectionChange},
]

$: selectedtab = tabs[0] || {}

    
function handleSelectionChange(evt) {
  selectedExample = examples.find(ex => ex.story == evt.detail.selecteditem) || {}
}

function tabselectionchange(evt) {
  selectedtab = evt.detail.selecteditem
}

</script>


<HorizontalSplitPane topheight='65vh'>
<div slot="top" class="full flex-column">
  <h1 class="h1">{das.name}</h1>
  <iframe class="myframe" title="preview" bind:this={myframe} src="/gardenframe/"></iframe>
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
    display: blocK;
    height: 100%;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ababab;
    border-bottom: none;
    border-radius: 2px;
  }
</style>
