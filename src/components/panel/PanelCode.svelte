<script>
  import {highlightElement} from '../highlight/Highlight.js'
  export let code
  let tmpcode
  let codeblock 
  $: {
    if (code != tmpcode) {
      tmpcode = null
    }
    setTimeout(() => {
      tmpcode = code
      if (tmpcode && codeblock) {
        highlightElement(codeblock)
      }
    }, 10)
  }
</script>

{#if tmpcode}
<div>
  <pre><code class="language-xml" bind:this={codeblock}>{code}</code></pre>
</div>
{/if}
