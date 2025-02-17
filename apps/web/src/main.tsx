import React from 'react'
import ReactDOM from 'react-dom/client'

const root = document.querySelector('#root')
if (!root) throw new Error('Could not find root node')

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <p>TURBOTRON</p>
  </React.StrictMode>
)
