import { useEffect, useState } from 'react';
import { Gamepad2, Menu, X } from 'lucide-react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Rules', href: '#rules' },
  { label: 'Reports', href: '#reports' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0f]/90 backdrop-blur-md border-b border-cyan-500/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Bloc<span className="text-cyan-400"> Dix</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-gray-400 hover:text-cyan-400 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="https://discord.gg/blocdix"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#5865F2] hover:bg-[#4752c4] text-white text-sm font-semibold transition-colors"
        >
          Join Discord
        </a>

        <button
          className="md:hidden text-gray-300"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-md border-b border-cyan-500/10 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-gray-400 hover:text-cyan-400 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://discord.gg/blocdix"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#5865F2] text-white text-sm font-semibold"
          >
            Join Discord
          </a>
        </div>
      )}
    </header>
  );
}
