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
    const response = await fetch('/src/components/buttons/Buttons.example.svelte?raw')
    code = 'foobar'

 //   code = await response.text()
    console.log('DEBUG', code )
  }
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
