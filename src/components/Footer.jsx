import { FiGithub, FiLinkedin, FiInstagram, FiMail } from 'react-icons/fi';

const quickLinks = [
  { label: 'Beranda', href: '#home' },
  { label: 'Tentang Saya', href: '#about' },
  { label: 'Portofolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { icon: FiGithub, label: 'GitHub', href: 'https://github.com/' },
  { icon: FiLinkedin, label: 'LinkedIn', href: 'https://linkedin.com/' },
  { icon: FiInstagram, label: 'Instagram', href: 'https://instagram.com/' },
  { icon: FiMail, label: 'Email', href: 'mailto:arif@example.com' },
];

function Footer() {
  return (
    <footer className="border-t border-slate-300 dark:border-slate-800/70 bg-white dark:bg-slate-950/90 py-8 sm:py-10 text-slate-600 dark:text-slate-400">
      <div className="layout mx-auto flex flex-col gap-6 sm:gap-8 px-4 sm:px-6 md:flex-row md:items-start md:justify-between md:px-10">
        <div className="min-w-0">
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">Arif Dev</p>
          <p className="mt-2 sm:mt-3 max-w-sm text-xs sm:text-sm text-slate-700 dark:text-slate-400">Portofolio web modern untuk personal branding IT / Web Developer yang responsif dan profesional.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm text-slate-700 dark:text-slate-400">
          {quickLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-cyan-700 dark:hover:text-cyan-300 text-xs sm:text-base">{link.label}</a>
          ))}
        </div>
      </div>
      <div className="layout mx-auto mt-6 sm:mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-300 dark:border-slate-800/70 px-4 sm:px-6 pt-6 text-xs sm:text-sm text-slate-600 dark:text-slate-500 md:flex-row md:px-10">
        <p>© {new Date().getFullYear()} Arif Wibisono. All rights reserved.</p>
        <div className="flex gap-3 sm:gap-4">
          {socials.map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="text-slate-600 dark:text-slate-400 transition hover:text-cyan-700 dark:hover:text-cyan-300">
              <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
