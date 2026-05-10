import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function About() {
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [certificateIndex, setCertificateIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const skillsSnap = await getDocs(collection(db, 'skills'));
        setSkills(skillsSnap.docs.map(doc => doc.data().name));

        const experiencesSnap = await getDocs(collection(db, 'experiences'));
        setExperiences(experiencesSnap.docs.map(doc => doc.data()));

        const certificatesSnap = await getDocs(collection(db, 'certificates'));
        setCertificates(certificatesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error loading data:', error);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const nextCertificate = () => {
    setCertificateIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevCertificate = () => {
    setCertificateIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  return (
    <section id="about" className="layout mx-auto px-4 pb-12 pt-8 sm:px-6 md:px-10 scroll-mt-20">
      <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8">
        <div className="space-y-2 sm:space-y-3 text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-300">Tentang Saya</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-100 md:text-4xl">Profesional front-end dengan pengalaman fullstack ringan.</h2>
          <p className="mx-auto max-w-3xl text-sm sm:text-base text-slate-700 dark:text-slate-300">Saya menggabungkan estetika desain minimalis dan performa teknis untuk solusi digital yang elegan dan mudah digunakan. Fokus pada proyek website, dashboard, dan integrasi Firebase.</p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2 auto-rows-max">
          {/* Pendidikan Card */}
          <article className="h-full rounded-2xl sm:rounded-3xl border border-slate-300 dark:border-slate-700/50 bg-white dark:bg-slate-900/70 shadow-soft p-5 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            {/* Header */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-500/10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600 dark:text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0v6"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100">
                  Pendidikan
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Academic Background
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="mt-6 sm:mt-7 md:mt-8 space-y-4">
              <div className="rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/30 p-4 sm:p-5 md:p-6 transition-all hover:border-cyan-300/50 dark:hover:border-cyan-500/30">
                {/* Title Section */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                      Universitas Esa Unggul
                    </h4>
                    <p className="mt-2 text-cyan-600 dark:text-cyan-400 font-medium text-sm sm:text-base">
                      Teknik Informatika
                    </p>
                  </div>
                  <span className="flex-shrink-0 inline-flex items-center rounded-full bg-cyan-100 dark:bg-cyan-500/10 px-3 py-1 sm:px-3.5 sm:py-1.5 text-xs font-semibold text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/20">
                    2020 - 2024
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base leading-relaxed text-justify text-slate-700 dark:text-slate-300 mb-5 sm:mb-6">
                  Saya mahasiswa lulusan S1 Teknik Informatika Universitas Esa Unggul dengan IPK{' '}
                  <span className="font-semibold text-cyan-600 dark:text-cyan-400">3.88</span>, memiliki minat
                  besar di bidang programming dan Fullstack Development, cepat belajar teknologi baru, mudah
                  beradaptasi, serta mampu bekerja secara tim maupun individu.
                </p>

                {/* Links */}
                <div className="flex flex-col xs:flex-row xs:flex-wrap gap-2 sm:gap-3">
                  {/* PDDIKTI Link */}
                  <a
                    href="https://pddikti.kemdiktisaintek.go.id/detail-mahasiswa/n7R1vP-pOYGhAGsdyYsgp4yLFxsqLjV5cQ5iHWrnlhFpW7QaGsaNFjEDWp4TL3YpnCk7gg=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center sm:justify-start gap-2 rounded-lg sm:rounded-xl border border-cyan-200 dark:border-cyan-500/20 bg-cyan-50 dark:bg-cyan-500/10 px-3 py-2 sm:px-4 text-xs sm:text-sm font-semibold text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-500/20 transition-all duration-300 flex-1 sm:flex-none"
                  >
                    <span>🎓</span>
                    <span>PDDIKTI</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h6m0 0v6m0-6L10 16" />
                    </svg>
                  </a>

                  {/* Journal Link */}
                  <a
                    href="https://garuda.kemdiktisaintek.go.id/documents/detail/4829886"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center sm:justify-start gap-2 rounded-lg sm:rounded-xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-2 sm:px-4 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all duration-300 flex-1 sm:flex-none"
                  >
                    <span>📄</span>
                    <span>Lihat Jurnal</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h6m0 0v6m0-6L10 16" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </article>

          {/* Kampus Merdeka MSIB Card */}
          <article className="h-full rounded-2xl sm:rounded-3xl border border-slate-300 dark:border-slate-700/50 bg-white dark:bg-slate-900/70 shadow-soft p-5 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            {/* Header */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0H9m0 0H3m6 0v-4a2 2 0 012-2h2a2 2 0 012 2v4"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  Kampus Merdeka MSIB
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Independent Study Program
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="mt-6 sm:mt-7 md:mt-8 space-y-4">
              <div className="rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/30 p-4 sm:p-5 md:p-6 transition-all hover:border-emerald-300/50 dark:hover:border-emerald-500/30">
                {/* Title Section */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                      Dicoding Indonesia
                    </h4>
                    <p className="mt-2 text-emerald-600 dark:text-emerald-400 font-medium text-sm sm:text-base">
                      Front-End & Back-End Web Dev
                    </p>
                  </div>
                  <span className="flex-shrink-0 inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-500/10 px-3 py-1 sm:px-3.5 sm:py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20 whitespace-nowrap">
                    Feb - Jun 2023
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base leading-relaxed text-justify text-slate-700 dark:text-slate-300 mb-5 sm:mb-6">
                  Saya pernah mengikuti program studi independen yang berfokus pada Pengembangan Front-End Web
                  dan Back-End. Program ini diselenggarakan melalui kerja sama antara Kampus Merdeka dan mitra
                  industri Dicoding Indonesia untuk meningkatkan kompetensi pengembangan aplikasi web modern.
                </p>

                {/* Certificate Link */}
                <div>
                  <a
                    href="https://drive.google.com/file/d/1Dx3KiNS0JRTENGxMviTOZI2twnyYCoSM/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center sm:justify-start gap-2 rounded-lg sm:rounded-xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-2 sm:px-4 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all duration-300 w-full sm:w-auto"
                  >
                    <span>📜</span>
                    <span>Lihat Sertifikat</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h6m0 0v6m0-6L10 16" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-950/40 p-5 sm:p-6 shadow-soft">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">Skills</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Kemampuan teknis utama yang ditarik langsung dari Admin Dashboard.</p>
            </div>
            <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Realtime dari collection skills</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {loading && skills.length === 0 ? (
              Array.from({ length: 6 }).map((_, index) => (
                <span key={index} className="h-8 min-w-[5rem] rounded-full bg-slate-200 dark:bg-slate-800/60 animate-pulse" />
              ))
            ) : skills.length === 0 ? (
              <p className="text-sm text-slate-600 dark:text-slate-400">Tidak ada skill yang tersedia saat ini.</p>
            ) : (
              skills.map((skill) => (
                <span key={skill} className="inline-flex items-center rounded-full border border-slate-300 dark:border-slate-700/50 bg-white dark:bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-900 dark:text-slate-100 shadow-sm">
                  {skill}
                </span>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl sm:rounded-3xl border border-slate-300 dark:border-slate-700/60 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900/50 dark:to-slate-950/80 p-6 sm:p-8 shadow-soft">
          <div className="mb-5 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">Pengalaman Kerja</h3>
            <div className="mt-2 h-1 w-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full"></div>
          </div>
          {loading ? (
            <div className="grid gap-4 sm:gap-6">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="animate-pulse rounded-xl sm:rounded-2xl p-4 sm:p-6 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
                  <div className="flex gap-4">
                    <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl bg-slate-300 dark:bg-slate-700 flex-shrink-0" />
                    <div className="flex-1 space-y-3">
                      <div className="h-5 w-3/4 rounded-lg bg-slate-300 dark:bg-slate-700" />
                      <div className="h-4 w-1/2 rounded-lg bg-slate-300 dark:bg-slate-700" />
                      <div className="h-4 w-full rounded-lg bg-slate-300 dark:bg-slate-700" />
                      <div className="h-4 w-5/6 rounded-lg bg-slate-300 dark:bg-slate-700" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : experiences.length === 0 ? (
            <div className="text-center py-12 text-slate-600 dark:text-slate-400">Tidak ada pengalaman kerja.</div>
          ) : (
            <div className="grid gap-3 sm:gap-4">
              {experiences.map((exp, index) => (
                <div key={index} className="group rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/30 p-5 sm:p-6 transition-all hover:border-cyan-300 dark:hover:border-cyan-500/40 hover:shadow-lg dark:hover:shadow-cyan-900/20 hover:-translate-y-1">
                  <div className="flex gap-4 sm:gap-5">
                    {exp.logo && (
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 p-2 flex items-center justify-center border border-cyan-200 dark:border-cyan-700/50 shadow-sm">
                          <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
                        </div>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1 sm:mb-2">
                        <h4 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 line-clamp-2">{exp.position}</h4>
                        <span className="text-xs sm:text-sm font-medium text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-900/30 px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0">{exp.duration}</span>
                      </div>
                      <p className="text-sm sm:text-base font-semibold text-cyan-700 dark:text-cyan-400 mb-2 sm:mb-3">{exp.company}</p>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-justify">{exp.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl sm:rounded-3xl border border-slate-300 dark:border-slate-700/60 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900/50 dark:to-slate-950/80 p-6 sm:p-8 shadow-soft">
          <div className="mb-5 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">Sertifikat</h3>
            <div className="mt-2 h-1 w-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full"></div>
          </div>
          {loading ? (
            <div className="animate-pulse">
              <div className="h-52 sm:h-64 md:h-72 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-2xl sm:rounded-3xl" />
            </div>
          ) : certificates.length === 0 ? (
            <div className="text-center py-12 text-slate-600 dark:text-slate-400">Tidak ada sertifikat.</div>
          ) : (
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between gap-2 sm:gap-4">
                <button
                  onClick={prevCertificate}
                  className="flex-shrink-0 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-600/10 to-blue-600/10 dark:from-cyan-500/20 dark:to-blue-500/20 hover:from-cyan-600/20 hover:to-blue-600/20 dark:hover:from-cyan-500/30 dark:hover:to-blue-500/30 text-cyan-600 dark:text-cyan-400 transition-all hover:scale-110 border border-cyan-200 dark:border-cyan-700/30 shadow-sm hover:shadow-md"
                  aria-label="Previous certificate"
                >
                  <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <div className="flex-1 min-w-0">
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900 shadow-lg">
                  <div className="relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center min-h-[260px] sm:min-h-[320px]">
                    {certificates[certificateIndex]?.image ? (
                      <img
                        src={certificates[certificateIndex].image}
                        alt={certificates[certificateIndex].name}
                        className="max-w-full max-h-[420px] object-contain transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 flex flex-col items-center justify-center p-4">
                        <p className="text-center text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300 line-clamp-2">{certificates[certificateIndex]?.name}</p>
                        {certificates[certificateIndex]?.duration && (
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-3">{certificates[certificateIndex].duration}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

                <button
                  onClick={nextCertificate}
                  className="flex-shrink-0 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-600/10 to-blue-600/10 dark:from-cyan-500/20 dark:to-blue-500/20 hover:from-cyan-600/20 hover:to-blue-600/20 dark:hover:from-cyan-500/30 dark:hover:to-blue-500/30 text-cyan-600 dark:text-cyan-400 transition-all hover:scale-110 border border-cyan-200 dark:border-cyan-700/30 shadow-sm hover:shadow-md"
                  aria-label="Next certificate"
                >
                  <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {certificates.length > 1 && (
                <div className="flex justify-center gap-2">
                  {certificates.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCertificateIndex(idx)}
                      className={`transition-all duration-300 rounded-full ${
                        idx === certificateIndex
                          ? 'w-8 h-2 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 shadow-md'
                          : 'w-2 h-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                      }`}
                      aria-label={`Go to certificate ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              {certificates[certificateIndex] && (
                <div className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-200 dark:border-cyan-700/30 p-4 sm:p-6 text-center space-y-2 sm:space-y-3">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">{certificates[certificateIndex].name}</h4>
                  {certificates[certificateIndex].duration && (
                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">{certificates[certificateIndex].duration}</p>
                  )}
                  {certificates[certificateIndex].link && (
                    <a
                      href={certificates[certificateIndex].link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors hover:underline"
                    >
                      <span>Lihat Sertifikat</span>
                      <span className="text-lg">↗</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default About;
