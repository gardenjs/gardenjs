<script>
  import './markdown.css'
  import { marked } from 'marked'
  import { highlightElement } from '../../highlight/Highlight.js'

  let { das } = $props()
  let element = $state()

  $effect(() => {
    if (das && element) {
      setTimeout(() => {
        if (element) {
          Array.from(element.querySelectorAll('pre code')).forEach(
            (codeblock) => {
              highlightElement(codeblock)
            }
          )
        }
      }, 200)
    }
  })
</script>

<div class="markdown-body" bind:this={element}>
  <!-- eslint-disable-next-line -->
  {@html marked(das.descriptionfile || das.description)}
</div>

<style>
  .markdown-body {
    padding: 1.25rem;
  }
</style>
