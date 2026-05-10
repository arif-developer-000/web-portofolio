import { useEffect, useState } from 'react';

const storageKey = 'web-porto-theme';

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved ? saved === 'dark' : prefersDark;
    setDarkMode(initial);
    document.documentElement.classList.toggle('dark', initial);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem(storageKey, darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return [darkMode, setDarkMode];
}
