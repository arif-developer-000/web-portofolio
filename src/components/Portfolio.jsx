import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        setProjects(querySnapshot.docs.map(doc => doc.data()));
      } catch (error) {
        console.error('Error loading projects:', error);
      }
      setLoading(false);
    };
    loadProjects();
  }, []);

  return (
    <section id="portfolio" className="layout mx-auto px-4 pb-12 pt-8 sm:px-6 md:px-10 scroll-mt-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 space-y-2 sm:space-y-3 text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-300 font-semibold">Portofolio</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 leading-tight">Project terbaru yang saya kerjakan.</h2>
          <p className="mx-auto max-w-3xl text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">Contoh proyek web dengan tampilan profesional, performa baik, dan struktur modern yang mudah dioperasikan.</p>
        </div>

        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-900/70 shadow-soft flex flex-col h-full">
                <div className="h-40 sm:h-48 md:h-56 bg-slate-200 dark:bg-slate-700"></div>
                <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 flex flex-col flex-grow">
                  <div className="h-6 w-3/4 rounded-2xl bg-slate-200 dark:bg-slate-700" />
                  <div className="flex gap-2 flex-wrap">
                    <div className="h-8 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
                    <div className="h-8 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
                    <div className="h-8 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
                  </div>
                  <div className="space-y-2 flex-grow">
                    <div className="h-4 w-full rounded-2xl bg-slate-200 dark:bg-slate-700" />
                    <div className="h-4 w-5/6 rounded-2xl bg-slate-200 dark:bg-slate-700" />
                  </div>
                  <div className="flex gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <div className="h-9 flex-1 rounded-lg bg-slate-200 dark:bg-slate-700" />
                    <div className="h-9 flex-1 rounded-lg bg-slate-200 dark:bg-slate-700" />
                  </div>
                </div>
              </div>
            ))
          ) : projects.length === 0 ? (
            <div className="text-center text-slate-600 dark:text-slate-400 col-span-full">
              No projects available yet.
            </div>
          ) : (
            projects.map((project) => (
              <article key={project.name} className="group overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-900/70 shadow-soft transition hover:-translate-y-1 hover:border-cyan-600 dark:hover:border-cyan-400/40 hover:bg-slate-50 dark:hover:bg-slate-900/90 flex flex-col h-full">
                <div className="h-40 sm:h-48 md:h-56 bg-gradient-to-br from-cyan-600/20 dark:from-cyan-500/20 via-slate-200 dark:via-slate-900/20 to-slate-300 dark:to-slate-950/40 flex-shrink-0"></div>
                <div className="space-y-4 p-4 sm:p-6 flex flex-col flex-grow">
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 line-clamp-2">{project.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="inline-block rounded-full border border-cyan-300 dark:border-cyan-500/30 bg-cyan-50 dark:bg-cyan-900/20 px-2.5 sm:px-3 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-300">{tech}</span>
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 line-clamp-3 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2 border-t border-slate-200 dark:border-slate-700/50">
                    <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 rounded-lg sm:rounded-xl bg-cyan-600 dark:bg-cyan-500 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white dark:text-slate-950 transition hover:bg-cyan-700 dark:hover:bg-cyan-400 flex-1 sm:flex-none min-h-[36px]">
                      <FiExternalLink size={16} /> <span>Demo</span>
                    </a>
                    <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 rounded-lg sm:rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 transition hover:border-cyan-600 dark:hover:border-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 hover:text-cyan-700 dark:hover:text-cyan-300 flex-1 sm:flex-none min-h-[36px]">
                      <FiGithub size={16} /> <span>Code</span>
                    </a>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
