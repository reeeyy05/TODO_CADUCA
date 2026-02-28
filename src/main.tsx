import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './i18n';
import App from './App.tsx'
// Aplicar tema inicial antes de montar React para evitar parpadeos
try {
  const saved = localStorage.getItem('theme');
  const initial = saved === 'light' ? 'light' : 'dark'; // default dark
  const root = document.documentElement;
  if (initial === 'dark') {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
  } else {
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
  }
} catch (e) {
  // ignore (e.g., SSR or restricted storage)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
