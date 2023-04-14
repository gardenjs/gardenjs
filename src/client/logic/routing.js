import { writable, get } from 'svelte/store'
import {initRouter} from '../router.js'
export const componentname = writable('')
export const das  = writable()
export const selectedExample = writable({})

let dasMap
let historystate

export function updateDasMap(newDasMap) {
  dasMap = newDasMap
  updateSelectedExample
}

export function initRouting(routes, baseurl) {
  initRouter(routes, baseurl, (routeobj, state) => {
    if (!routeobj) {
      das.set({})
      componentname.set('')
    } else {
      componentname.set(routeobj.fullname)
      const newDas = dasMap[routeobj.fullname]
      newDas.componentfile = routeobj.file
      das.set(newDas)
      historystate = state
      updateSelectedExample()
    }
  })
}

export function updateSelectedExample() {
  const examples = get(das).examples || []
  if (historystate.selectedstory) {
    selectedExample.set(examples.find(ex => ex.story == historystate.selectedstory)?.story)
  } else {
    selectedExample.set(examples[0]?.story)
  }
}
