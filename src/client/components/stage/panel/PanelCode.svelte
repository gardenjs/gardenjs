<script>
  import {highlightElement} from '../../highlight/Highlight.js'
  export let das
  export let expressbaseurl = 'http://localhost:3020/'
  let code = ''
  let codeblock 

  $: {
    if (das.componentfile) loadCode(das.componentfile)
  }

  async function loadCode(componentfile) {
    code = ''
    try {
      const response = await fetch(`${expressbaseurl}garden/raw/?file=${encodeURI(componentfile)}`)
      code = (await response.text())
    } catch (e) {
    }
  }
  $: {
    if (code && codeblock) {
      highlightElement(codeblock)
    }
  }
</script>

<div>
  {#if code}
    <pre><code class="language-xml" bind:this={codeblock}>{code}</code></pre>
  {/if}
</div>
