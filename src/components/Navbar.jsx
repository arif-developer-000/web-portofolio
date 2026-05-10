import { useEffect, useState } from 'react';
import DarkModeToggle from './DarkModeToggle.jsx';

const navItems = [
  { label: 'Beranda', href: '#home' },
  { label: 'Tentang Saya', href: '#about' },
  { label: 'Portofolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onResize = () => setOpen(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [open]);

  return (
    <header className={`sticky top-0 z-40 transition duration-500 ${scrolled ? 'backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/50 dark:border-slate-700/50 shadow-xl' : 'bg-transparent'}`}>
      <div className="layout mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 md:px-10">
        <a href="#home" className="text-lg sm:text-xl font-bold tracking-tight text-cyan-600 dark:text-cyan-400 flex-shrink-0">Arif<span className="text-slate-900 dark:text-slate-100">Wibisono</span></a>
        <nav className="hidden items-center gap-6 md:flex md:gap-8 text-sm text-slate-700 dark:text-slate-200">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-cyan-600 dark:hover:text-cyan-300 focus:text-cyan-600 dark:focus:text-cyan-300">
              {item.label}
            </a>
          ))}
          <DarkModeToggle />
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 md:hidden">
          <DarkModeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-lg sm:rounded-2xl border border-slate-300 dark:border-slate-700/70 bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 transition hover:border-cyan-500 dark:hover:border-cyan-400/50 hover:text-cyan-600 dark:hover:text-cyan-300 text-xl sm:text-2xl"
          >
            <span>{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden">
          <div className="mx-4 sm:mx-6 mb-4 sm:mb-6 rounded-2xl sm:rounded-3xl border border-slate-300 dark:border-slate-700/70 bg-white dark:bg-slate-950/95 p-4 sm:p-5 shadow-soft">
            <div className="flex flex-col gap-3 sm:gap-4 text-sm text-slate-700 dark:text-slate-200">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 transition hover:bg-slate-100 dark:hover:bg-slate-900/80 hover:text-cyan-600 dark:hover:text-cyan-300"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
