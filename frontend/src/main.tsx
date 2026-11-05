import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/bootstrap.min.css'
import './styles/splide.min.css'
import './styles/leaflet.min.css'
import './styles/template-theme.css'
import './styles/creative-buttons.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
