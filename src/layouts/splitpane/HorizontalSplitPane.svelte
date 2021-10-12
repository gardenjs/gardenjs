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
  <div class="flexfix dragbar-horizontal" on:mousedown={register}></div>
  <div class="full flex-grow"><slot name="bottom" /></div>
</div>

