<script>
  function register() {
    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', unregister)
  }

  const drag = (e) => {
    window.getSelection().removeAllRanges()
    topheight = (e.pageY - element.offsetTop - 7) + 'px'
  }

  function unregister() {
    document.removeEventListener('mousemove', drag)
    document.removeEventListener('mouseup', unregister)
  }

  let element

  export let topheight

</script>

<div class="full flex-column" bind:this={element} >
  <div class="flexfix" style="height: {topheight}"><slot name="top" /></div>
  <div class="dragbar-horizontal" on:mousedown={register}>
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#currentColor"><path d="M3.984 15v-2.016h16.031V15H3.984zm16.032-6v2.016H3.985V9h16.031z"/></svg>
  </div>
  <div class="infopanel"><slot name="bottom" /></div>
</div>

