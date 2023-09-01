<script>
    import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  let dragging = false
  let pageY
  function register() {
    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', unregister)
    dragging = true
  }

  const drag = (e) => {
    window.getSelection().removeAllRanges()
    topHeight = (e.pageY - element.offsetTop - 7) + 'px'
    pageY = e.pageY
    console.log('top', pageY, element.offsetTop, element.offsetHeight,topHeight)


  }

  function unregister() {
    document.removeEventListener('mousemove', drag)
    document.removeEventListener('mouseup', unregister)

    let bottomHeight = element.offsetHeight - pageY + element.offsetTop
    console.log('bottom', pageY, element.offsetTop, element.offsetHeight, bottomHeight)
    dispatch('out', {panelHeight: bottomHeight})
    dragging = false
  }

  let element

export let topHeight

</script>

<div class="is-full is-flex-column" bind:this={element} >
  <div class="is-flexfix backstage" style="height: {topHeight};"><slot name="top" /></div>
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