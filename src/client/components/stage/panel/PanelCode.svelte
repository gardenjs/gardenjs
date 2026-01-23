<script>
  import { highlightElement } from '../../highlight/Highlight.js'

  let { componentName, devmodus } = $props()

  let code = $state()
  let codeblock = $state()
  let rawComponentMap = $state([])

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

  $effect(() => {
    updateCode(componentName, rawComponentMap)
  })

  $effect(() => {
    if (code && codeblock) {
      highlightElement(codeblock)
    }
  })
</script>

<div class="panel_code">
  {#if devmodus}
    Running Gardenjs in devmodus. No Code view supported.
  {/if}
  {#if code}
    <pre><code class="language-xml" bind:this={codeblock}>{code}</code></pre>
  {/if}
</div>

<style>
  .panel_code {
    padding: 1.25rem;
  }
</style>
