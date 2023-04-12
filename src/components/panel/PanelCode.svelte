<script>
  export let code = `
  import foo from 'bar'
  const myfoo = foo()
  function nextBar(bar) {
    return myfoo(bar)
  }

  `
</script>

<div>
  <pre>
  <code class="language-js">
  {code}
  </code>
  </pre>
</div>
