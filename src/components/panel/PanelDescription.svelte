<script>
  import {marked} from 'marked'
  import './markdown.css'
  export let das
</script>
<div class="markdown-body">
  {@html marked(das.descriptionfile || das.description)}
</div>