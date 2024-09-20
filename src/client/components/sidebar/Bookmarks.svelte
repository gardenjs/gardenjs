<script>
  import Link from './SidebarNavLinks.svelte'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let bookmarks = []

  function toggleBookmark(bookmark) {
    dispatch('out', { toggleBookmark: bookmark })
  }
</script>

<nav class="bookmarks">
  <ul>
    <li>
      <!-- prettier-ignore -->
      <div class="bookmarks_title">
        <span class="bookmarks_title-icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="bookmark_icon" height="15" viewBox="0 0 24 24" width="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </span>
        <span class="bookmarks_title-label">Bookmarks</span>
      </div>
      <ul class="components">
        {#each bookmarks as bookmark}
          <li class="component">
            <Link
              href={bookmark.href}
              selected={bookmark.selected}
              text={bookmark.name}
            />
            <button class="close" on:click={() => toggleBookmark(bookmark)}>
              <!-- prettier-ignore -->
              <svg xmlns="http://www.w3.org/2000/svg" class="close-icon" height="12" viewBox="0 0 24 24" width="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </li>
        {/each}
      </ul>
    </li>
  </ul>
</nav>

<style>
  .bookmarks {
    border-bottom: 1px solid var(--c-bg-body);
    margin: 0 0 1rem;
    padding: 0 0 1rem;
  }
  .bookmarks_title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin: 0;
    padding: 0.5rem 0.688rem 0.375rem 0.688rem;
  }
  .bookmarks_title-icon {
    display: flex;
    align-items: center;
    margin-right: 0.375rem;
    color: var(--c-primary);
  }
  .bookmarks_title-label {
    display: flex;
    width: 100%;
    font-size: 0.813rem;
    color: var(--c-basic-900);
    font-weight: 600;
    text-transform: uppercase;
    overflow: hidden;
    white-space: nowrap;
  }
  .components {
    margin-left: 1.063rem;
    border-left: 1px solid var(--c-basic-250);
  }
  .component {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    height: 1.375rem;
    width: 100%;
    z-index: 1;
  }
  :global(.component:hover) {
    background-color: var(--c-basic-100);
  }
  :global(.component:hover .component_link) {
    color: var(--c-primary);
  }
  .component:focus-visible {
    color: var(--c-primary);
    outline: none;
    background-color: var(--c-basic-100);
  }
  .close {
    margin-left: auto;
    height: 22px;
    z-index: 9;
  }
  :global(.component:has(.close:hover) a) {
    color: var(--c-basic-900);
    font-weight: 400;
  }
  :global(.component:has(.close:hover) a.selected) {
    color: var(--c-primary);
    font-weight: 600;
  }
  .close-icon {
    display: block;
    color: var(--c-basic-600);
  }
  .close:hover .close-icon,
  .close:focus-visible .close-icon {
    color: var(--c-primary);
  }

  /* must be set global inside SidebarNavLinks  */
  :global(.component:has(.component_link.selected) .close) {
    background-color: var(--c-primary-bg);
  }
</style>
