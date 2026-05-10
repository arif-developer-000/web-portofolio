import { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiMessageSquare, FiGlobe } from 'react-icons/fi';
import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig.js';

const defaultSocialLinks = [
  { icon: 'github', label: 'GitHub', href: 'https://github.com/' },
  { icon: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/' },
  { icon: 'instagram', label: 'Instagram', href: 'https://instagram.com/' },
  { icon: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/6281234567890' },
  { icon: 'mail', label: 'Email', href: 'mailto:arif@example.com' },
];

const iconMap = {
  github: FiGithub,
  linkedin: FiLinkedin,
  instagram: FiInstagram,
  whatsapp: FiMessageSquare,
  mail: FiMail,
  website: FiGlobe,
};

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [contactLinks, setContactLinks] = useState(null);

  useEffect(() => {
    setForm({ name: '', email: '', message: '' });
    setStatus(null);

    const loadContactLinks = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'contactLinks'));
        const links = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setContactLinks(links);
      } catch (error) {
        console.error('Error loading contact links:', error);
        setContactLinks([]);
      }
    };

    loadContactLinks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi input
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: 'error', message: 'Harap isi semua field sebelum mengirim pesan.' });
      return;
    }

    // Validasi email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.email)) {
      setStatus({ type: 'error', message: 'Format email tidak valid.' });
      return;
    }

    // Validasi panjang pesan
    if (form.message.length < 10) {
      setStatus({ type: 'error', message: 'Pesan minimal 10 karakter.' });
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, 'contacts'), {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        message: form.message.trim(),
        createdAt: serverTimestamp(),
      });
      setForm({ name: '', email: '', message: '' });
      setStatus({ type: 'success', message: 'Pesan berhasil dikirim! Saya akan merespons secepatnya.' });
      
      // Auto-clear success message setelah 5 detik
      setTimeout(() => setStatus(null), 5000);
    } catch (error) {
      console.error('Error detail:', error);
      
      // Deteksi berbagai jenis error
      if (error.code === 'permission-denied') {
        setStatus({ type: 'error', message: 'Akses ditolak. Silakan coba lagi.' });
      } else if (error.code === 'unavailable') {
        setStatus({ type: 'error', message: 'Layanan tidak tersedia. Periksa koneksi internet Anda.' });
      } else if (error.code === 'invalid-argument') {
        setStatus({ type: 'error', message: 'Data tidak valid. Periksa kembali form Anda.' });
      } else {
        setStatus({ type: 'error', message: 'Terjadi kesalahan saat mengirim pesan. Coba lagi nanti.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const links = contactLinks?.length ? contactLinks : defaultSocialLinks;

  return (
    <section id="contact" className="layout mx-auto px-4 pb-16 pt-12 sm:px-6 md:px-10 scroll-mt-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 sm:mb-16 text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-300 font-semibold">Hubungi Saya</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 bg-clip-text text-transparent mt-3 mb-4">Mari Kolaborasi</h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">Siap membantu mewujudkan ide kreatif Anda menjadi solusi digital yang inovatif dan berkualitas tinggi.</p>
        </div>

        <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1.2fr_0.8fr] xl:grid-cols-[1.3fr_0.7fr]">
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            <div className="card-panel p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <FiMail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">Let's Connect</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Temukan cara terbaik untuk menghubungi saya</p>
                </div>
              </div>

              <div className="grid gap-3 sm:gap-4">
                {contactLinks === null ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800/50 p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700" />
                        <div className="flex-1 h-4 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                      </div>
                    </div>
                  ))
                ) : (
                  links.map((item) => {
                    const Icon = iconMap[item.icon] || FiGlobe;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/30 hover:border-cyan-300 dark:hover:border-cyan-500/50 hover:bg-cyan-50/50 dark:hover:bg-cyan-900/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center group-hover:from-cyan-100 group-hover:to-blue-100 dark:group-hover:from-cyan-800 dark:group-hover:to-blue-800 transition-all duration-300">
                          <Icon className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="block font-semibold text-slate-900 dark:text-slate-100 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">{item.label}</span>
                          <span className="block text-sm text-slate-500 dark:text-slate-400 truncate">{item.href.replace(/^https?:\/\//, '')}</span>
                        </div>
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </a>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="card-panel p-6 sm:p-8 lg:p-10">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Kirim Pesan</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Isi form di bawah ini dan saya akan merespons secepat mungkin</p>
            </div>

            <form onSubmit={handleSubmit} autoComplete="off" className="space-y-5">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Nama Lengkap</label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    autoComplete="name"
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-400/20"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    autoComplete="email"
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-400/20"
                    placeholder="email@domain.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Pesan</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={form.message}
                    autoComplete="off"
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-400/20 resize-none"
                    placeholder="Tuliskan pesan atau kebutuhan Anda di sini..."
                  />
                </div>
              </div>

              {status && (
                <div role="status" aria-live="polite" className={`rounded-xl px-4 py-3 text-sm font-medium ${status.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'}`}>
                  <div className="flex items-center gap-2">
                    {status.type === 'success' ? (
                      <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <span>{status.message}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-3 px-6 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-70 transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <>
                    <FiMail className="w-5 h-5" />
                    <span>Kirim Pesan</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
