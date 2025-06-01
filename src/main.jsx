import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { Theme } from '@radix-ui/themes'
import { ReactLenis, useLenis } from 'lenis/react'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme>
      <ReactLenis root />
    <App />
    </Theme>
  </StrictMode>
)
