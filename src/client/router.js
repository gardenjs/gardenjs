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
  dispatchUpdateRoute(initialState, '', currentUrl)
}

export function setRoutes(nRoutes) {
  routes = nRoutes
}

export function onUpdateRoute(listener) {
  listeners.push(listener)
}

function dispatchUpdateRoute(state, title, url) {
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
  history.pushState = function (state, title, url) {
    // @ts-ignore
    if (typeof history.onpushstate == 'function') {
      // @ts-ignore
      history.onpushstate(state, title, url)
    }
    return pushState.apply(history, arguments)
  }

  // @ts-ignore
  history.onpushstate = function (state, title, target) {
    if (target.startsWith(baseurl) && baseurl.length > 0) return // TODO check this line
    currentUrl = baseurl + target
    state.url = currentUrl
    dispatchUpdateRoute(state, title, currentUrl)
    setTimeout(
      () => globalThis.history.replaceState(state, title, currentUrl),
      1
    )
  }
})(globalThis.history)

globalThis.onpopstate = function (event) {
  if (event.state) currentUrl = event.state.url
  else currentUrl = baseurl.length > 0 ? baseurl : '/'
  dispatchUpdateRoute(event.state, event.title, currentUrl)
}
