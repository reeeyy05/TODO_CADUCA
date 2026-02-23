import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = () => {
  
  // 1. Estado inicial
  const [theme, setTheme] = useState(() => {
    // 1) Si hay valor en localStorage, usarlo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;

    // 2) Si no hay valor, usar 'dark' como base (requisito del proyecto)
    return 'dark';
  });

  // 2. Cada vez que 'theme' cambia, actualizamos el DOM y localStorage
  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  // 3. Función para alternar
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Cambiar tema"
    >
      {theme === 'dark' ? (
        <Sun size={24} className="text-yellow-400" />
      ) : (
        <Moon size={24} className="text-gray-700" />
      )}
    </button>
  );
};
