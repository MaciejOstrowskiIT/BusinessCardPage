import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Background from "./components/Background/Background.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Background />
  </React.StrictMode>,
)
