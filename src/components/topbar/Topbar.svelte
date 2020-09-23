<div class="topbar">
  <div class="btn-burger">
    <div class="toggleIcon" bind:this={toggleIcon} on:click={toggle}>
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="bar3"></div>
    </div>
  </div>
</div>

<script>
  import { createEventDispatcher} from 'svelte'
const dispatch = createEventDispatcher()

export let active = true
let toggleIcon

$: { 
    if (toggleIcon) {
      if (active) {
        toggleIcon.classList.add('active')
      } else {
        toggleIcon.classList.remove('active')
      }
    }
}

function toggle() {
    toggleIcon.classList.toggle('active')
    active = !active
    dispatch('out', {active})
}

</script>
