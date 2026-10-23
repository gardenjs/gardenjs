export function calculateInspectorBox(htmlElement, scrollTop, scrollLeft) {
  const rect = htmlElement.getBoundingClientRect()
  const style = getComputedStyle(htmlElement)

  const hasGaps =
    (style.display === 'grid' || style.display === 'flex') &&
    htmlElement.children.length > 0

  const tagName = htmlElement.tagName
  const id = htmlElement.id
  const classList = Array.from(htmlElement.classList)

  const margin = {
    top: parseFloat(style.marginTop),
    right: parseFloat(style.marginRight),
    bottom: parseFloat(style.marginBottom),
    left: parseFloat(style.marginLeft),
  }

  const padding = {
    top: parseFloat(style.paddingTop),
    right: parseFloat(style.paddingRight),
    bottom: parseFloat(style.paddingBottom),
    left: parseFloat(style.paddingLeft),
    width: rect.width,
    height: rect.height,
  }

  const box = {
    top: scrollTop + rect.top - margin.top,
    right: scrollLeft + rect.left + rect.width + margin.right,
    bottom: scrollTop + rect.top + rect.height + margin.bottom,
    left: scrollLeft + rect.left - margin.left,
    width: rect.width + margin.left + margin.right,
    height: rect.height + margin.top + margin.bottom,
  }

  const content = {
    tagName,
    id,
    classList,
    width: parseFloat(style.width),
    height: parseFloat(style.height),
    background: style.backgroundColor,
    gap: parseFloat(style.gap) || 0,
    rowGap: parseFloat(style.rowGap) || 0,
    columnGap: parseFloat(style.columnGap) || 0,
    margin,
    padding,
  }
  const gaps = hasGaps
    ? calcGaps(htmlElement, box, margin, padding, scrollTop, scrollLeft)
    : []
  const info = calcInfobox(content, box, scrollTop, scrollLeft, hasGaps)

  return { box, margin, padding, content, gaps, info, id, htmlElement }
}

function calcGaps(element, box, margin, padding, scrollTop, scrollLeft) {
  return Array.from(element.children).map((child) => {
    const { marginTop, marginLeft, marginRight, marginBottom } =
      getComputedStyle(child)
    const rect = child.getBoundingClientRect()
    return {
      y:
        scrollTop +
        rect.top -
        box.top -
        margin.top -
        padding.top -
        parseFloat(marginTop),
      x:
        scrollLeft +
        rect.left -
        box.left -
        margin.left -
        padding.left -
        parseFloat(marginLeft),
      width: rect.width + parseFloat(marginLeft) + parseFloat(marginRight),
      height: rect.height + parseFloat(marginTop) + parseFloat(marginBottom),
    }
  })
}

function calcInfobox(content, box, scrollTop, scrollLeft, hasGaps) {
  const bodyRect = document.body.getBoundingClientRect()
  const infoboxHeight = 130 + (hasGaps ? 20 : 0) + content.classList.length * 20
  const infoboxWidth = 225
  const bodyHeight = bodyRect.height
  const bodyWidth = bodyRect.width

  const posTopPossible = box.top - scrollTop - infoboxHeight > 0
  const posBottomPossible = box.bottom - scrollTop + infoboxHeight < bodyHeight
  const posLeftPossible = box.left - scrollLeft + infoboxWidth < bodyWidth

  const infobox = {
    style: {},
  }
  if (posBottomPossible) {
    infobox.style.top = box.bottom + 8 + 'px'
    infobox.position = 'bottom'
  } else if (posTopPossible) {
    infobox.style.top = box.top + 5 - infoboxHeight + 'px'
    infobox.position = 'top'
  } else {
    infobox.style.top = 'unset'
    infobox.style.bottom = -scrollTop + 'px'
    infobox.position = 'center'
  }
  if (posLeftPossible) {
    infobox.style.left = box.left + 'px'
    infobox.style.right = 'unset'
    infobox.position += 'left'
  } else {
    infobox.style.left = 'unset'
    infobox.style.right = bodyWidth - box.right + 'px'
    infobox.position += 'right'
  }
  return infobox
}
