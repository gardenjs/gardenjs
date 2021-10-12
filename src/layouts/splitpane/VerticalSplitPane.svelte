<script>
  function register() {
    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', unregister)
  }

  const drag = (e) => {
    window.getSelection().removeAllRanges()
    leftwidth = (e.pageX - element.offsetLeft - 7) + 'px'
  }

  function unregister() {
    document.removeEventListener('mousemove', drag)
    document.addEventListener('mouseup', unregister)
  }

  let element

  export let leftwidth
  const dragbarwidth = 15
  $: leftPlusDragbarWidth = leftwidth + dragbarwidth 

</script>
<div class="flex-row" bind:this={element} >
  <div style="width: {leftwidth}"><slot name="left" /></div>
  <div class="dragbar-vertical" on:mousedown={register}></div>
  <div style="width: calc(100% - {leftPlusDragbarWidth}px)"><slot name="right" /></div>
</div>

