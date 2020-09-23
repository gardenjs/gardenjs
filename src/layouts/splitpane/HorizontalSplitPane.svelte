<script>
  let mousedown
  function register() {
    mousedown = true
    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', unregister)
  }

  const drag = (e) => {
    console.log(e.pageY, e.pageX, e)
    document.selection ? document.selection.empty() : window.getSelection().removeAllRanges()
    topheight = (e.pageY - element.offsetTop - 7) + 'px'
  }

  function unregister() {
    document.removeEventListener('mousemove', drag)
    document.addEventListener('mouseup', unregister)
  }

  let element

  export let topheight
  const dragbarheight = 15
  $: topPlusDragbarHeight = topheight + dragbarheight

</script>
<div class="flex-column" bind:this={element} >
  <div style="height: {topheight}"><slot name="top" /></div>
  <div class="dragbar-horizontal" on:mousedown={register}></div>
  <div style="height: calc(100% - {topPlusDragbarHeight}px)"><slot name="bottom" /></div>
</div>

