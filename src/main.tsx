import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/profile.css'
import Profile from './components/profile/Profile.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Profile />
  </StrictMode>,
)
