import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'

let app

export const createApp = () => {
  app = ReactDOM.createRoot(document.getElementById('app'))
}

export const updateApp = (props) => {
  app?.unmount?.()
  createApp()
  app.render(<DynamicComponent {...props} />)
}

function DynamicComponent({
  component: Component,
  selectedExample,
  afterRenderHook,
}) {
  if (afterRenderHook) {
    useEffect(() => {
      console.log('DEBUG', 'useeffect', afterRenderHook)
      afterRenderHook()
      console.log('ENDE')
    }, [])
  }
  return (
    <React.StrictMode>
      <Component {...selectedExample?.input} />
    </React.StrictMode>
  )
}

export const destroyApp = () => {
  app.unmount()
  document.getElementById('app').innerHTML = ''
}
