<div class="topbar">
  <div class="topbar__inner">
    <button class="topbar__nav-btn" class:active={active} on:click={toggle}>
      <svg xmlns="http://www.w3.org/2000/svg" height="34" viewBox="0 0 24 24" width="34" fill="#fff"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
    </button>
    <div class="topbar__nav">
      <div class="dropdown">
        <button class="dropdown__btn" title="switch component theme">Themes <svg class="label-first" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg></button>
        <div class="dropdown__items">
          <ul>
            <li><a href="./"><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="#currentColor"><path d="M12 9c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3m0-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>Light Mode</a></li>
            <li><a href="./"><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="#currentColor"><path d="M9.37 5.51A7.35 7.35 0 009.1 7.5c0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27A7.014 7.014 0 0112 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>Dark Mode</a></li>
          </ul>
        </div>
      </div>
      <button class="switch-mode" on:click={toggleDarkmode} title="switch library mode">
        {#if dark}
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#currentColor"><path d="M12 9c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3m0-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>
        {:else }
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#currentColor"><path d="M9.37 5.51A7.35 7.35 0 009.1 7.5c0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27A7.014 7.014 0 0112 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>
        {/if}
      </button>
    </div>
  </div>
</div>

<script>
  import { createEventDispatcher} from 'svelte'
  const dispatch = createEventDispatcher()

  export let active = true
  export let dark = false

  $: {
    if (dark)
      document.body.classList.add('dark')
    else 
      document.body.classList.remove('dark')
  }

  function toggle() {
      dispatch('out', {active: !active})
  }

  function toggleDarkmode() {
    dark = !dark
  }

</script>

<style>
  .topbar {
    width: 100%;
    height: 50px;
    background-color: var(--gray-50);
    border-style: solid;
    border-width: 2px;
    border-image: linear-gradient(to right, rgb(0, 219, 0), rgb(0, 172, 0), 20%, hsl(17, 83%, 60%), 30%, hsl(17, 83%, 50%), #EA5B21) 0 0 100% 0 stretch;
  }
  .topbar svg {
    fill: var(--gray-900);
  }
  .topbar__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 2rem;
  }
  .topbar__nav-btn {
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
  }
  .topbar__nav {
    display: flex;
    align-items: center;
  }
  .switch-mode {
    width: 1.5rem;
    height: 1.5rem;
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
  }
  .dropdown {
    position: relative;
    display: inline-block;
    margin-right: 2rem;
  }
  .dropdown__btn {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--gray-900);
  }
  .dropdown__btn svg {
    fill: var(--gray-900);
    margin-left: 0.5rem;
  }
  .dropdown__items {
    visibility: hidden;
    position: absolute;
    z-index: 9;
  }
  .dropdown__items ul {
    margin: 0;
    padding: 0;
    border: 1px solid var(--gray-900);
    border-radius: 0.5rem;
    overflow: hidden;
  }
  .dropdown__items ul li {
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .dropdown__items ul li a {
    display: flex;
    align-items: center;
    padding: 0.5rem 0.5rem;
    font-size: 0.875rem;
    color: var(--gray-900);
    text-decoration: none;
    white-space: nowrap;
    background-color: var(--white);
  }
  .dropdown__items ul li a:hover {
    background-color: var(--primary-bg);
  }
  .dropdown__items ul li a svg {
    margin: 0 0.5rem 0 0;
  }
  .dropdown:hover > .dropdown__items,
  .dropdown:focus > .dropdown__items {
    display: block;
    visibility: visible;
  }
</style>