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
    <section id="contact" className="layout mx-auto px-4 pb-12 pt-8 sm:px-6 md:px-10 scroll-mt-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 sm:gap-8 lg:gap-10 lg:grid-cols-[1.1fr_0.9fr] xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-3 sm:space-y-4">
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-300">Contact</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 md:text-4xl">Mari bicara tentang proyek Anda.</h2>
            <p className="max-w-xl text-sm sm:text-base text-slate-700 dark:text-slate-300">Kirimkan pesan dengan detail singkat kebutuhan Anda, dan saya akan menghubungi secepatnya untuk diskusi lebih lanjut.</p>
            <div className="grid gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-slate-300 dark:border-slate-700/60 bg-white dark:bg-slate-950/80 p-4 sm:p-6 shadow-soft">
              {contactLinks === null ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="animate-pulse flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-2xl border border-slate-400 dark:border-slate-700/70 bg-slate-100 dark:bg-slate-900/80 px-3 sm:px-4 py-2 sm:py-3">
                    <span className="h-9 sm:h-10 w-9 sm:w-10 rounded-lg sm:rounded-2xl bg-slate-200 dark:bg-slate-700 flex-shrink-0" />
                    <span className="h-3 sm:h-4 w-32 rounded-2xl bg-slate-200 dark:bg-slate-700" />
                  </div>
                ))
              ) : (
                links.map((item) => {
                  const Icon = iconMap[item.icon] || FiGlobe;
                  return (
                    <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="btn-secondary w-full text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </a>
                  );
                })
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} autoComplete="off" className="rounded-xl sm:rounded-2xl border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-900/70 p-4 sm:p-6 shadow-soft">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">Nama</label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  autoComplete="name"
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-300 dark:border-slate-700/70 bg-slate-50 dark:bg-slate-900/90 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-base text-slate-900 dark:text-slate-100 outline-none transition focus:border-cyan-600 dark:focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-600/10 dark:focus:ring-cyan-500/10"
                  placeholder="Nama lengkap"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  autoComplete="email"
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-300 dark:border-slate-700/70 bg-slate-50 dark:bg-slate-900/90 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-base text-slate-900 dark:text-slate-100 outline-none transition focus:border-cyan-600 dark:focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-600/10 dark:focus:ring-cyan-500/10"
                  placeholder="email@domain.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">Pesan</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={form.message}
                  autoComplete="off"
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-300 dark:border-slate-700/70 bg-slate-50 dark:bg-slate-900/90 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-base text-slate-900 dark:text-slate-100 outline-none transition focus:border-cyan-600 dark:focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-600/10 dark:focus:ring-cyan-500/10 resize-none"
                  placeholder="Tuliskan kebutuhan atau pertanyaan Anda..."
                />
              </div>
              {status && (
                <div role="status" aria-live="polite" className={`rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm ${status.type === 'success' ? 'bg-emerald-600/15 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-200 border border-emerald-600/30 dark:border-emerald-500/20' : 'bg-rose-600/15 dark:bg-rose-500/15 text-rose-700 dark:text-rose-200 border border-rose-600/30 dark:border-rose-500/20'}`}>
                  {status.message}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
