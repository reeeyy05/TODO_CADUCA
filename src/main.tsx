import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ProductsCards from './components/cards/ProductsCards.tsx'
import LandingPageCards from './components/cards/LandingPageCards.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <LandingPageCards />
    <ProductsCards />
  </StrictMode>,
)
