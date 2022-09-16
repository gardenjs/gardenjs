<!-- maybe later to reduce stage width to show responsive behaviour of composnents -->

<!-- <script>
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
  <div class="dragbar-vertical" on:mousedown={register}>
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="14"><path d="M3.75 3.333v17.334h2.167V3.333H3.75zm6.5 17.334V3.333H8.083v17.334h2.167z"/></svg>
  </div>
  <div style="width: calc(100% - {leftPlusDragbarWidth}px)"><slot name="right" /></div>
</div>

<style>
  .flex-row {
   height: 100%;
   display: flex;
   flex-direction: row;
   flex-wrap: nowrap;
 }
</style> -->
