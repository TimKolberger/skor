import App from './App'
import './index.css'
import './pwa-automatic-reload'
import '@fontsource/source-code-pro/300.css'
import '@fontsource/source-code-pro/400.css'
import '@fontsource/source-code-pro/900.css'
import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
