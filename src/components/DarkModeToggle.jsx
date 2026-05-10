import { FiMoon, FiSun } from 'react-icons/fi';
import { useDarkMode } from '../hooks/DarkModeContext.jsx';

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setDarkMode((prev) => !prev)}
      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-300 dark:border-slate-700/70 bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 transition hover:border-cyan-500 dark:hover:border-cyan-400/60 hover:text-cyan-600 dark:hover:text-cyan-300"
    >
      {darkMode ? <FiSun className="h-6 w-6" /> : <FiMoon className="h-6 w-6" />}
    </button>
  );
}

export default DarkModeToggle;
