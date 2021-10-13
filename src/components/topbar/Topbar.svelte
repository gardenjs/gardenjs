<div class="topbar">
  <div class="topbar__inner">
    <button class="topbar__nav-btn" bind:this={toggleIcon} on:click={toggle}>
      <svg xmlns="http://www.w3.org/2000/svg" height="34" viewBox="0 0 24 24" width="34" fill="#fff"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
    </button>
    <div class="topbar__nav">
      <button class="switch-mode">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#currentColor"><path d="M9.37 5.51A7.35 7.35 0 009.1 7.5c0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27A7.014 7.014 0 0112 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>
        <!-- add toggle to switch icon dark-mode to icon light-mode -->
      </button>
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


// add toggle to switch icon dark-mode to icon light-mode

</script>
