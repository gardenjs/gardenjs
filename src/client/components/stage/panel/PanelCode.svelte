<script>
  import { highlightElement } from '../../highlight/Highlight.js'

  export let componentName
  export let devmodus

  let code
  let codeblock
  let rawComponentMap = []

  $: {
    updateCode(componentName, rawComponentMap)
  }

  if (!devmodus) {
    importComponentMap()
  }

  async function importComponentMap() {
    const componentModule = await import('../raw_component_import_map.js')
    rawComponentMap = componentModule.rawComponentMap
  }

  function updateCode(componentName, rawComponentMap) {
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
  {#if devmodus}
    Running Gardenjs in devmodus. No Code view supported.
  {/if}
  {#if code}
    <pre><code class="language-xml" bind:this={codeblock}>{code}</code></pre>
  {/if}
</div>
