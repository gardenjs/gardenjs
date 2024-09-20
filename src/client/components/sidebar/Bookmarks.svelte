<script>
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
      <ul class="items">
        <li class="item">
          <!-- possibly take links from SidebarNavLinks: -->
          <a href="." class="component_link">
            <span class="component_dot"></span>
            <span class="component_icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                viewBox="0 0 24 24"
                height="15"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path
                  d="M21 8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
                /><path d="M3.3 7l8.7 5 8.7-5M12 22V12" /></svg
              >
            </span>
            <span class="component_label">Bookmarked item 1</span>
          </a>
          <button class="close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="close-icon"
              height="15"
              viewBox="0 0 24 24"
              width="15"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg
            >
          </button>
        </li>
        <li class="item">
          <!-- possibly take links from SidebarNavLinks: -->
          <a href="." class="component_link selected">
            <span class="component_dot"></span>
            <span class="component_icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                viewBox="0 0 24 24"
                height="15"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path
                  d="M21 8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
                /><path d="M3.3 7l8.7 5 8.7-5M12 22V12" /></svg
              >
            </span>
            <span class="component_label">Bookmarked item 2</span>
          </a>
          <button class="close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="close-icon"
              height="15"
              viewBox="0 0 24 24"
              width="15"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg
            >
          </button>
        </li>
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
  .items {
    margin-left: 1.063rem;
    border-left: 1px solid var(--c-basic-250);
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    width: 100%;
  }
  .item:hover {
    background-color: var(--c-basic-100);
  }
  .item:hover .component_link {
    color: var(--c-primary);
  }
  .item:focus-visible {
    color: var(--c-primary);
    outline: none;
    background-color: var(--c-basic-100);
  }
  .close {
    position: absolute;
    right: 0;
  }
  .close-icon {
    display: block;
    color: var(--c-basic-600);
  }

  /* same like in SidebarNavLinks... take links from there later and delete styles underneath */
  .component_link {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding: 0.188rem 0;
    text-transform: initial;
    font-size: 0.813rem;
    color: var(--c-basic-600);
    line-height: 1.2;
    font-weight: 400;
  }
  .component_link:hover,
  .component_link:focus-visible {
    color: var(--c-primary);
    font-weight: 500;
    background-color: var(--c-basic-100);
  }
  .component_link .component_dot {
    display: block;
    margin: 0 0.5rem 0 -0.219rem;
    height: 0.375rem;
    width: 0.375rem;
    background-color: transparent;
    border-radius: 50%;
  }
  .component_link.selected .component_dot {
    background-color: var(--c-primary);
  }
  .component_link.selected {
    margin-left: -1px;
    color: var(--c-primary);
    font-weight: 600;
    background-color: var(--c-primary-bg);
    border-left: 1px solid var(--c-primary);
  }
  .component_icon {
    display: flex;
    align-items: center;
    margin-right: 0.438rem;
    color: var(--c-basic-400);
  }
  .component_label {
    margin-right: 0.5rem;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
