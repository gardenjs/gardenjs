<script>
  import { marked } from 'marked'
  export let das
</script>
<div>
  {@html marked(das.descriptionfile || das.description)}
</div>
