import { writable, get } from 'svelte/store'

function localStore(
  name,
  defaultValue,
  parseString = (value) => value,
  stringify = (value) => value
) {
  const store = writable(
    parseString(localStorage.getItem(name)) ?? defaultValue
  )
  store.subscribe((value) => {
    localStorage.setItem(name, stringify(value))
  })
  return store
}

export const nodes = writable([])
export const rootNodesExpanded = writable(true)
export const filterNavTree = writable()
export const selectedNode = writable()
export const bookmarks = localStore('bookmarks', [], JSON.parse, JSON.stringify)

let initialized = false
let currentRoute = ''
let navtree = []
let unfoldedNodes = []
let selectedComponent

function initializeTree(navtree) {
  const all = navtree.flatMap(getAllNodes)
  unfoldedNodes = all.reduce((acc, cur) => {
    acc[cur.key] = true
    return acc
  }, {})
}

function getAllNodes(node) {
  return [node, ...getAllChildNodes(node)]
}

function getAllChildNodes(node) {
  return node.children ? node.children.flatMap(getAllNodes) : []
}

export function updateSelectedComponent(route, componentName) {
  currentRoute = route
  selectedComponent = componentName
  updateTree()
  updateBookmarks()
}

export function updateFilter(newFilter) {
  filterNavTree.set(newFilter)
  updateTree()
}

export function updateNavTree(newNavTree) {
  navtree = newNavTree
  if (!initialized) {
    initializeTree(navtree)
    cleanupBookmarks()
    initialized = true
  }
  nodes.set(transformNavTree(navtree))
}

function updateTree() {
  nodes.set(transformNavTree(navtree))
}

function transformNavTree(nodes, parentVisible) {
  const filter = get(filterNavTree)
  return nodes
    .map((child) => {
      const filterMatches = filter
        ? child.name?.toLowerCase().includes(filter)
        : true
      const name =
        filter && filterMatches ? highlightFilterMatch(child.name) : child.name
      if (child.isLeaf) {
        const visible = parentVisible || filterMatches
        const node = visible
          ? {
              ...child,
              name,
              selected: selectedComponent === child.key,
              isLeaf: true,
              bookmark:
                get(bookmarks).find((b) => b.key === child.key) !== undefined,
            }
          : undefined
        if (node?.selected) {
          selectedNode.set(node)
        }
        return node
      } else {
        const children = transformNavTree(
          child.children,
          parentVisible || filterMatches
        ).filter((n) => n)
        const visible = filterMatches || children.length > 0
        return visible
          ? {
              ...child,
              name,
              children,
              unfolded: isUnfolded(child, currentRoute, filter, visible),
              filterMatches,
            }
          : undefined
      }
    })
    .filter((n) => n)
}

function highlightFilterMatch(text) {
  const filter = get(filterNavTree)
  const matchStart = text.toLowerCase().indexOf(filter)
  const matchEnd = matchStart + filter.length
  const start = text.substring(0, matchStart)
  const middle = text.substring(matchStart, matchEnd)
  const end = text.substring(matchEnd)
  return `${start}<span class="highlight">${middle}</span>${end}`
}

function isUnfolded(node, route, filter, visible) {
  return (
    (filter && visible) ||
    unfoldedNodes[node.key] ||
    route?.indexOf(node.key) === 0
  )
}

export function toggleRootFolders() {
  rootNodesExpanded.set(!get(rootNodesExpanded))
  const newNodes = get(nodes).map((n) => ({
    ...n,
    unfolded: get(rootNodesExpanded) && unfoldedNodes[n.key],
  }))
  nodes.set(newNodes)
}

export function toggleFolder(node) {
  if (!get(rootNodesExpanded)) {
    expandRootNode(node)
    return
  }
  if (unfoldedNodes[node.key] && !(currentRoute.indexOf(node.key) === 0)) {
    unfoldedNodes[node.key] = false
  } else {
    unfoldedNodes[node.key] = true
  }
  updateTree()
}

function expandRootNode(node) {
  rootNodesExpanded.set(true)
  Object.keys(unfoldedNodes).forEach((key) => (unfoldedNodes[key] = false))
  const newNodes = get(nodes).map((n) => {
    if (n.key === node.key || currentRoute.indexOf(n.key) === 0) {
      unfoldedNodes[n.key] = true
      return { ...n, unfolded: true }
    } else {
      unfoldedNodes[n.key] = false
      return { ...n, unfolded: false }
    }
  })
  nodes.set(newNodes)
  updateTree()
}

export function toggleBookmark(node) {
  if (node.bookmark) {
    removeBookmark({ ...node, bookmark: false })
  } else {
    addBookmark({ ...node, bookmark: true })
  }
  updateTree()
}

function removeBookmark(node) {
  bookmarks.set(
    get(bookmarks)
      .filter((bookmark) => node.key !== bookmark.key)
      .map((bookmark) => {
        return { ...bookmark, selected: bookmark.key === selectedComponent }
      })
  )
  updateTree()
}

function addBookmark(node) {
  bookmarks.set(
    [...get(bookmarks), node]
      .map((bookmark) => {
        return { ...bookmark, selected: bookmark.key === selectedComponent }
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  )
  updateTree()
}

function updateBookmarks() {
  bookmarks.set(
    [...get(bookmarks)]
      .map((bookmark) => {
        return { ...bookmark, selected: bookmark.key === selectedComponent }
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  )
}

function cleanupBookmarks() {
  const allNodes = navtree.flatMap(getAllNodes)
  const validBookmarks = get(bookmarks).filter((bookmark) => {
    return allNodes.some((node) => node.key === bookmark.key)
  })
  bookmarks.set(validBookmarks)
}
