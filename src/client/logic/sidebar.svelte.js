import { innerWidth } from 'svelte/reactivity/window'

export const sidebar = $state({
  width: 260,
  maxWidth: 260,
  sidebarExpanded: false,
})

let previousWidth = $state(260)
let desktopExpanded = $state(true)
let mobileExpanded = $state(false)
let showMobileNav = $state(true)

export const initSidebar = () => {
  $effect(() => {
    if (innerWidth.current < 840) {
      mobileExpanded = false
      showMobileNav = true
    } else {
      showMobileNav = false
    }
  })

  $effect(() => {
    sidebar.sidebarExpanded = showMobileNav ? mobileExpanded : desktopExpanded
  })
}

export function toggleExpandSidebar() {
  if (sidebar.sidebarExpanded) {
    previousWidth = sidebar.width
    sidebar.width = 0
  } else {
    sidebar.width = previousWidth ?? 260
  }
  if (showMobileNav) {
    mobileExpanded = !mobileExpanded
  } else {
    desktopExpanded = !desktopExpanded
  }
}

export function collapseMobileNavIfVisible() {
  if (showMobileNav) {
    mobileExpanded = false
  }
}
