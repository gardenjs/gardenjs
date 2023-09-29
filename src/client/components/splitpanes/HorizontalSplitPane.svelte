<script>
  let dragging = false
  function register() {
    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', unregister)
    dragging = true
  }

  const drag = (e) => {
    window.getSelection().removeAllRanges()
    topheight = (e.pageY - element.offsetTop - 7) + 'px'
  }

  function unregister() {
    document.removeEventListener('mousemove', drag)
    document.removeEventListener('mouseup', unregister)
    dragging = false
  }

  let element

  export let topheight

</script>

<div class="stagepanel_container" bind:this={element} >
  <div class="stage" style="height: {topheight};"><slot name="top" /></div>
  <div class="dragbar" class:dragging on:mousedown={register}></div>
  <slot name="bottom" />
</div>

<style>
  .stagepanel_container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
  .stage {
    flex-grow: 0;
    flex-shrink: 0;
    background-color: var(--c-basic-250);
    border-radius: 0.5rem 0.5rem 0 0;
    overflow: hidden;
  }
  .dragbar {
    flex-grow: 0;
    flex-shrink: 0;
    height: 0.188rem;
    background-color: var(--c-basic-300);
    cursor: row-resize;
    z-index: 10;
  }
  .dragging,
  .dragbar:hover {
    background-color: var(--c-primary);
    transform: scaleY(1.7);
  }
</style>