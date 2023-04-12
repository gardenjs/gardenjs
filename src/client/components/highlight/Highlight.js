import hljs from 'highlight.js'
import './highlight.css'

export const triggerHighlightAll = () => {
  setTimeout(() => {
   hljs.highlightAll()
  }, 600)
}

export const highlightElement = (element) => {
  hljs.highlightElement(element)
}
