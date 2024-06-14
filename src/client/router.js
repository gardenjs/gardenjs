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
    if (url.startsWith(baseurl) && baseurl.length > 0) return // TODO check this line
    currentUrl = baseurl + url
    state.url = currentUrl
    if (
      state.url !== history.state.url ||
      state.selectedExample !== history.state.selectedExample
    ) {
      dispatchUpdateRoute(state, title, currentUrl)
      return pushState.apply(history, [state, '', currentUrl])
    } else {
      window.location.reload()
    }
  }
})(globalThis.history)

globalThis.onpopstate = function (event) {
  if (event.state) currentUrl = event.state.url
  else currentUrl = baseurl.length > 0 ? baseurl : '/'
  dispatchUpdateRoute(event.state, event.title, currentUrl)
}
