<script>
  import {highlightElement} from '../../highlight/Highlight.js'
  import {rawComponentMap} from '/raw_component_import_map.js'

  export let componentName 
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
