import { writable, get, derived } from 'svelte/store'

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
let navtree = writable([])
let unfoldedNodes = []
let selectedComponent

export const treeCollapsed = derived(navtree, ($navtree) => {
  return !$navtree.some((node) => isUnfolded(node))
})

function initializeTree() {
  const all = get(navtree).flatMap(getAllNodes)
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
  selectedComponent = componentName
  updateTree()
  updateBookmarks()
}

export function updateFilter(newFilter) {
  filterNavTree.set(newFilter)
  updateTree()
}

export function updateNavTree(newNavTree) {
  if (!initialized) {
    initializeTree()
    cleanupBookmarks()
    initialized = true
  }
  nodes.set(transformNavTree(newNavTree))
  navtree.set(newNavTree)
}

function updateTree() {
  nodes.set(transformNavTree(get(navtree)))
  navtree.set(get(navtree))
}

function transformNavTree(nodes, parentVisible) {
  const filter = get(filterNavTree)?.toLowerCase()
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
              unfolded: isUnfolded(child, filter, visible),
              filterMatches,
            }
          : undefined
      }
    })
    .filter((n) => n)
}

function highlightFilterMatch(text) {
  const filter = get(filterNavTree).toLowerCase()
  const matchStart = text.toLowerCase().indexOf(filter)
  const matchEnd = matchStart + filter.length
  const start = text.substring(0, matchStart)
  const middle = text.substring(matchStart, matchEnd)
  const end = text.substring(matchEnd)
  return `${start}<span class="highlight">${middle}</span>${end}`
}

function isUnfolded(node, filter, visible) {
  return (filter && visible) || unfoldedNodes[node.key]
}

function normalizeHref(href) {
  return href.split('#')[0].split('?')[0].replace(/\/+$/, '')
}

export function navigateToLeafNode(href) {
  const targetHref = normalizeHref(href)

  const all = get(navtree).flatMap(getAllNodes)
  const leaf = all.find((n) => n.isLeaf && normalizeHref(n.href) === targetHref)

  const hrefToUse = normalizeHref(leaf?.href) || targetHref
  const parts = hrefToUse.split('/').filter((p) => p.length > 0)
  if (parts.length < 2) return leaf

  for (let i = 0; i < parts.length - 1; i++) {
    const key = '/' + parts.slice(0, i + 1).join('/') + '/'
    unfoldedNodes[key] = true
  }

  rootNodesExpanded.set(true)
  updateTree()
}

export function toggleFolder(node) {
  unfoldedNodes[node.key] = !unfoldedNodes[node.key]
  updateTree()
}

export function collapseTree() {
  const all = get(navtree).flatMap(getAllNodes)
  unfoldedNodes = all.reduce((acc, cur) => {
    acc[cur.key] = false
    return acc
  }, {})
  console.log('DEBUG', 'collapse')
  updateTree()
}

export function expandTree() {
  const all = get(navtree).flatMap(getAllNodes)
  unfoldedNodes = all.reduce((acc, cur) => {
    acc[cur.key] = true
    return acc
  }, {})
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
  const allNodes = get(navtree).flatMap(getAllNodes)
  const validBookmarks = get(bookmarks).filter((bookmark) => {
    return allNodes.some((node) => node.key === bookmark.key)
  })
  bookmarks.set(validBookmarks)
}
