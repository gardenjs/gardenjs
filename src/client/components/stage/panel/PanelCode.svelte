<script>
  import { highlightElement } from '../../highlight/Highlight.js'

  /**
   * @typedef {Object} Props
   * @property {any} componentName
   * @property {any} devmodus
   */

  /** @type {Props} */
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

<div>
  {#if devmodus}
    Running Gardenjs in devmodus. No Code view supported.
  {/if}
  {#if code}
    <pre><code class="language-xml" bind:this={codeblock}>{code}</code></pre>
  {/if}
</div>
