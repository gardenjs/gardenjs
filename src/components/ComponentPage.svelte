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
  {name: 'description', props: {text: das.name}},
  {name: 'css', props: {text:'css'}},
  {name: 'html', props: {text:'html'} },
  {name: 'example', props: {selected: selectedExample.story, items: examples.map(ex => ex.story)}, page: InputSelectionComponent, out: handleSelectionChange},
]

$: selectedtab = tabs[0] || {}

    
function handleSelectionChange(evt) {
  selectedExample = examples.find(ex => ex.story == evt.detail.selecteditem) || {}
}

function tabselectionchange(evt) {
  selectedtab = evt.detail.selecteditem
}

</script>

<HorizontalSplitPane topheight='50vh'>
<div slot="top" class="full overflow">
  <iframe class="myframe" title="preview" bind:this={myframe} src="http://localhost:3010/gardenframe/"></iframe>
</div>
<div slot="bottom" class="full">
  <TabsComponent tabs={tabs} on:out={tabselectionchange}>
    {#if selectedtab.name == 'description'}
      <h2>{das.name}</h2>
      <p>{das.description}</p>
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
    {:else if selectedtab.name == 'html'}
      <div> Test </div>
    {/if}
  </TabsComponent>
</div>
</HorizontalSplitPane>

<style>
 .myframe {
   border-width: 5px;
   display: blocK;
   height: 100%;
   width: 100%;
 }
</style>
