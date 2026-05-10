import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage.jsx';
import AdminPage from './pages/AdminPage.jsx';

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'auto', block: 'start' });
        }, 0);
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollManager />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 text-slate-950 dark:text-slate-100 transition-colors duration-300">
        <div className="absolute inset-0 dark:bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.15),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.18),_transparent_22%)] pointer-events-none"></div>
        <div className="relative">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
