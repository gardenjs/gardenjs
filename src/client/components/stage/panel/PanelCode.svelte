<script>
  import { highlightElement } from '../../highlight/Highlight.js'

  export let componentName
  export let rawComponentMap
  let code
  let codeblock

  $: {
    updateCode(componentName)
  }

  function updateCode(componentName) {
    code = null
    setTimeout(() => {
      code = rawComponentMap[componentName]
    })
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
