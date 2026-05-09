<script>
  import { fade } from 'svelte/transition'

  let { message, open = false, onClose, onMouseEnter, onMouseLeave } = $props()
</script>

{#if open}
  <div
    class="notification"
    role="status"
    aria-live="polite"
    transition:fade={{ duration: 180 }}
    onmouseenter={onMouseEnter}
    onmouseleave={onMouseLeave}
  >
    <div class="notification_text">
      {message}
    </div>
    {#if onClose}
      <button
        class="notification_close"
        type="button"
        title="close"
        onclick={onClose}
      >
        <span class="is-hidden">Close</span>
        <svg
          class="close"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    {/if}
  </div>
{/if}

<style>
  .notification {
    position: fixed;
    right: 0.375rem;
    top: calc(0.75rem + var(--h-topbar, 2.25rem));
    z-index: 99999;
    max-width: min(32rem, calc(100vw - 1.5rem));
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.625rem 0.75rem;
    border-radius: 0.75rem;
    color: var(--c-basic-900);
    background-color: var(--c-primary-bg);
    border: 1px solid var(--c-primary);
    box-shadow: 0 0.625rem 2rem hsla(0, 0%, 0%, 0.12);
  }
  .notification_text {
    font-size: 0.875rem;
    line-height: 1.4;
  }
  .notification_close {
    flex-shrink: 0;
    align-self: flex-start;
    border-radius: 999px;
    color: var(--c-primary);
  }
  .is-hidden {
    position: absolute !important;
    overflow: hidden;
    width: 1px;
    height: 1px;
    padding: 0;
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
  }
</style>
