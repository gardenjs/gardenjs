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
  <div class="is-flexfix dragbar" class:dragging on:mousedown={register}>
    <!-- <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 24 24" width="22"><path d="M3.984 15v-2.016h16.031V15H3.984zm16.032-6v2.016H3.985V9h16.031z"/></svg> -->
  </div>
  <slot name="bottom" />
</div>

<style>
.backstage {
  background-color: var(--c-basic-250);
}
.dragbar {
  height: 3px;
  background-color: var(--c-basic-300);
  cursor: row-resize;
  z-index: 10;
}
.dragging,
.dragbar:hover {
  /* background-color: var(--c-basic-300); */
  background-color: var(--c-primary);
  transform: scaleY(1.7);
}
/* .dragbar svg {
  fill: var(--c-basic-900);
} */
</style>