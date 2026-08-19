import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BackProvider } from './hooks/useBackNavigation.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BackProvider>
      <App />
    </BackProvider>
  </React.StrictMode>
)