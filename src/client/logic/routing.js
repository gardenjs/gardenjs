import { writable, get } from 'svelte/store'
import { initRouter } from '../router.js'

export const componentName = writable('')
export const das = writable()
export const selectedExample = writable({})
export const currentRoute = writable('')

let dasMap
let historystate
let initialized

export function updateDasMap(newDasMap) {
  dasMap = newDasMap
  if (initialized) updateSelectedExample()
}

export function initRouting(initialDasMap, routes, baseurl) {
  dasMap = initialDasMap
  if (!initialized) {
    initialized = true
    initRouter(routes, baseurl, updateRoute)
  }
}

function updateRoute(routeobj, state) {
  if (!routeobj || !dasMap) {
    das.set({})
    componentName.set('')
  } else {
    componentName.set(routeobj.fullname)
    currentRoute.set(routeobj.route)
    const newDas = dasMap[routeobj.fullname]
    newDas.componentfile = routeobj.file
    das.set(newDas)
    historystate = state
    updateSelectedExample()
  }
}

export function updateSelectedExample() {
  const examples = get(das).examples || []
  if (historystate?.selectedstory) {
    selectedExample.set(
      examples.find((ex) => ex.story == historystate.selectedstory)?.story
    )
  } else {
    selectedExample.set(examples[0]?.story)
  }
}
