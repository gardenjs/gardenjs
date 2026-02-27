import { writable, get } from 'svelte/store'
import { localStore, textOrNumberParser } from './localStore'
import { innerWidth } from 'svelte/reactivity/window'

export const sidebarWidth = localStore('sidebarWidth', 260, textOrNumberParser)
export const sidebarMaxWidth = writable(260)
export const sidebarExpanded = localStore('sidebarExpanded', false)

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
    sidebarExpanded.set(showMobileNav ? mobileExpanded : desktopExpanded)
  })
}

export function toggleExpandSidebar() {
  if (get(sidebarExpanded)) {
    previousWidth = get(sidebarWidth)
    sidebarWidth.set(0)
  } else {
    sidebarWidth.set(previousWidth ?? 260)
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

export function updateSidebarWidth(newWidth) {
  sidebarWidth.set(newWidth)
}

export function updateSidebarMaxWidth(newMaxWidth) {
  sidebarMaxWidth.set(newMaxWidth)
}
