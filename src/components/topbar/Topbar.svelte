<div class="topbar">
  <div class="topbar__inner">
    <div class="topbar__nav-icon">
      <div bind:this={toggleIcon} on:click={toggle}>
        <svg xmlns="http://www.w3.org/2000/svg" height="34" viewBox="0 0 24 24" width="34" fill="#fff"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
      </div>
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
