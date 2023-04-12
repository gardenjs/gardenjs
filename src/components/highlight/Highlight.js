import hljs from 'highlight.js'
import './highlight.css'

export const triggerHighlightAll = () => {
  setTimeout(() => {
    hljs.highlightAll()
  }, 200)
}
