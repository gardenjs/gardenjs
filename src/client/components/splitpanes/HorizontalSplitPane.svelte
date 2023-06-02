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

<div class="is-full is-flex-column" bind:this={element} >
  <div class="is-flexfix backstage" style="height: {topheight};"><slot name="top" /></div>
  <div class="is-flexfix dragbar" class:dragging on:mousedown={register}></div>
  <slot name="bottom" />
</div>

<style>
.backstage {
  background-color: var(--c-basic-250);
  border-radius: 0.5rem 0.5rem 0 0;
  overflow: hidden;
}
.dragbar {
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