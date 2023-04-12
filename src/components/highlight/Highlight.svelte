<script>
  import hljs from 'highlight.js'
  import './highlight.css'

  export let das

  $: {
    if (das) {
      setTimeout(() => {
        hljs.highlightAll();
      }, 400)
    }
  }
</script>