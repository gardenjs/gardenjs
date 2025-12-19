const listeners = []

const initialUrl = globalThis.location
  ? globalThis.location.pathname + globalThis.location.search
  : ''
let currentUrl = initialUrl
let baseurl = ''
let routes

let initialState = { url: currentUrl }

;(function storeInitialUrlInHistory() {
  if (globalThis.history) {
    if (
      globalThis.history.state &&
      globalThis.history.state.url == currentUrl
    ) {
      initialState = globalThis.history.state
    }
    globalThis.history.replaceState(initialState, null, currentUrl)
  }
})()

export function initRouter(nRoutes, newBaseUrl, listener) {
  routes = nRoutes
  baseurl = newBaseUrl
  if (listener) onUpdateRoute(listener)
  dispatchUpdateRoute(initialState, currentUrl)
}

export function setRoutes(nRoutes) {
  routes = nRoutes
}

export function onUpdateRoute(listener) {
  listeners.push(listener)
}

function dispatchUpdateRoute(state, url) {
  listeners.forEach((listener) => {
    listener(findRoute(url), state)
  })
}

export function findRoute(url) {
  const path = url.substring(baseurl.length)
  const route = Object.keys(routes).find((key) => {
    return path.match(new RegExp('^' + key + '$', 'i'))
  })
  return route ? routes[route] : null
}

;(function (history) {
  if (!history) return
  var pushState = history.pushState
  var replaceState = history.replaceState
  history.pushState = function (state, title, url) {
    const rawUrl = typeof url === 'string' ? url : ''
    let nextPath = rawUrl
    if (baseurl.length > 0 && nextPath.startsWith(baseurl)) {
      nextPath = nextPath.substring(baseurl.length) || '/'
    }
    if (nextPath.length === 0) nextPath = '/'
    if (nextPath[0] !== '/') nextPath = '/' + nextPath

    currentUrl = baseurl + nextPath
    const nextState = state && typeof state === 'object' ? state : {}
    // @ts-ignore
    nextState.url = currentUrl
    if (
      // @ts-ignore
      nextState.url !== history.state?.url ||
      // @ts-ignore
      nextState.selectedExample !== history.state?.selectedExample
    ) {
      dispatchUpdateRoute(nextState, currentUrl)
      return pushState.apply(history, [nextState, '', currentUrl])
    } else {
      dispatchUpdateRoute(nextState, currentUrl)
      return replaceState.apply(history, [nextState, '', currentUrl])
    }
  }
})(globalThis.history)

globalThis.onpopstate = function (event) {
  if (event.state) currentUrl = event.state.url
  else currentUrl = baseurl.length > 0 ? baseurl : '/'
  dispatchUpdateRoute(event.state, currentUrl)
}
