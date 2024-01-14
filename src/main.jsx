import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

//cargar configuracion de time-react ago
import TimeAgo from 'javascript-time-ago'

import es from 'javascript-time-ago/locale/es.json'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(es)
TimeAgo.addLocale(es)



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
