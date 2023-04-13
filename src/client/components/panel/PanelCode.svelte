<script>
  import {highlightElement} from '../highlight/Highlight.js'
  export let das
  let code = ''
  let tmpcode
  let codeblock 
  $: {
    loadCode(das)
  }

  async function loadCode(das) {
    try {
      const response = await fetch(`${das.componentfile}?raw`)
      code = (await response.text())
    } catch (e) {
      code = ''
    }
  }
  $: {
    if (code != tmpcode) {
      tmpcode = null
      setTimeout(() => {
        tmpcode = code
        console.log('DEBUG', tmpcode )
        if (tmpcode && codeblock) {
          codeblock.innerText=tmpcode
          highlightElement(codeblock)
        }
      }, 10)
    }
  }
</script>

{#if tmpcode}
<div>
  <pre><code class="language-xml" bind:this={codeblock}></code></pre>
</div>
{/if}
