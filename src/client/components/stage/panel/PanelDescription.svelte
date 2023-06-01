<script>
  import './markdown.css'
  import {marked} from 'marked'
  import {highlightElement} from '../../highlight/Highlight.js'
  export let das
  let element

  $: {
    if (das && element) {
      setTimeout(() => {
        if (element) {
          Array.from(element.querySelectorAll('pre code')).forEach(codeblock => {
            highlightElement(codeblock)
          })
        }
      }, 200)
    }
  }
</script>

<div class="markdown-body" bind:this={element}>
  {@html marked(das.descriptionfile || das.description)}
</div>
