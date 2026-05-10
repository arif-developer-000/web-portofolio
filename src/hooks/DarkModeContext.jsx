import React, { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('web-porto-theme');
    if (saved) {
      return saved === 'dark';
    }
    // Default berdasarkan preferensi system
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark class ke HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('web-porto-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={[darkMode, setDarkMode]}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within DarkModeProvider');
  }
  return context;
}
