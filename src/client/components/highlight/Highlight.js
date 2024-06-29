import './highlight.css'

export const highlightElement = async (element) => {
  try {
    const hljs = (await import('highlight.js')).default
    hljs.highlightElement(element)
  } catch (e) {
    console.error('Could not load highlight.js', e)
  }
}
