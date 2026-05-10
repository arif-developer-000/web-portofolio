import { useEffect, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import FotoProfil from '../assets/Foto-Profil.png';

function Hero() {
  const [mounted, setMounted] = useState(false);
  const [age, setAge] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    // Calculate age based on birth date (19 March 2002)
    const calculateAge = () => {
      const birthDate = new Date(2002, 2, 19); // Month is 0-indexed, so 2 = March
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      
      // Adjust age if birthday hasn't occurred this year
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      
      return calculatedAge;
    };
    
    setAge(calculateAge());
  }, []);

  return (
    <section id="home" className="layout mx-auto flex min-h-[88vh] flex-col justify-center gap-5 sm:gap-6 px-4 sm:px-6 pb-10 pt-8 md:flex-row md:items-center md:gap-8 lg:gap-12 lg:px-10 xl:gap-16 scroll-mt-20">
      <div className={`max-w-2xl space-y-5 sm:space-y-6 ${mounted ? 'fade-in' : 'opacity-0'}`}>
        <p className="inline-flex rounded-full bg-cyan-600/15 dark:bg-cyan-500/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-300">Developer Junior</p>
        <div>
        <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
          <h1 className="text-3xl sm:text-4xl font-semibold leading-tight text-slate-900 dark:text-slate-100 md:text-5xl xl:text-6xl">Arif Wibisono</h1>
        </div>
        <p className="mt-3 sm:mt-4 max-w-xl text-sm sm:text-base leading-relaxed sm:leading-8 text-slate-600 dark:text-slate-300 md:text-lg">Menciptakan website modern, clean, dan profesional dengan pengalaman front-end development, integrasi Firebase, dan solusi IT yang responsif.</p>
        </div>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <a href="#portfolio" className="inline-flex items-center justify-center rounded-lg sm:rounded-2xl bg-cyan-600 dark:bg-cyan-400 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white dark:text-slate-950 transition hover:bg-cyan-700 dark:hover:bg-cyan-300">Lihat Portofolio <FiArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" /></a>
          <a href="#contact" className="inline-flex items-center justify-center rounded-lg sm:rounded-2xl border border-slate-300 dark:border-slate-700/80 bg-slate-100 dark:bg-slate-900/90 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 transition hover:border-cyan-600 dark:hover:border-cyan-400/60 hover:text-cyan-700 dark:hover:text-cyan-300">Contact Saya</a>
        </div>
      </div>

      <div className={`relative mx-auto w-full max-w-2xl ${mounted ? 'fade-in delay-100' : 'opacity-0'}`}>
        <div className="absolute -left-10 sm:-left-14 top-8 sm:top-10 h-36 sm:h-44 w-36 sm:w-44 rounded-full bg-cyan-600/20 dark:bg-cyan-500/20 blur-3xl"></div>
        <div className="absolute -bottom-10 sm:-bottom-12 right-10 sm:right-12 h-28 sm:h-32 w-28 sm:w-32 rounded-full bg-violet-600/20 dark:bg-violet-500/20 blur-3xl"></div>
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-900/70 p-5 sm:p-8 shadow-soft">
          <div className="flex flex-col items-center gap-5 rounded-[2rem] bg-slate-100 dark:bg-slate-900/80 p-5 sm:p-8 shadow-inner shadow-slate-200 dark:shadow-slate-950/30 sm:flex-row sm:items-center">
            <div className="relative h-44 w-44 sm:h-52 sm:w-52 rounded-[2.5rem] overflow-hidden border-4 border-white/90 dark:border-slate-950/80 shadow-xl shadow-cyan-500/15 dark:shadow-cyan-400/15">
              <img
                src={FotoProfil}
                alt="Foto Profil Arif Wibisono"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 text-center sm:text-left">
              <p className="mb-3 text-xs sm:text-sm uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300/90">
                Halo, saya Arif
              </p>

              <span className="inline-flex items-center rounded-full bg-emerald-600/15 dark:bg-emerald-500/10 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20">
                {age} tahun
              </span>
              <p className="mt-2 text-lg sm:text-3xl font-semibold text-slate-900 dark:text-slate-100">Web Developer</p>
              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto sm:mx-0">Membangun pengalaman digital yang bersih, responsif, dan mudah digunakan untuk brand pribadi maupun bisnis.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
