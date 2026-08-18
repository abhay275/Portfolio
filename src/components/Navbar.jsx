import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Menu, X, Command } from 'lucide-react';

const navLinks = [
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'Security', href: '#cybersecurity' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenPalette }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const sections = navLinks.map(l => l.href.slice(1));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.3 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
          padding: '0 24px',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          ...(scrolled ? {
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
          } : {}),
        }}
      >
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <a
            href="#hero"
            onClick={e => { e.preventDefault(); scrollTo('#hero'); }}
            aria-label="Go to home"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
            }}
          >
            <img 
              src="/favicon.png" 
              alt="Logo" 
              style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'cover' }} 
            />
            <span style={{
              fontWeight: 700,
              fontSize: '0.95rem',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}>
              Abhay <span style={{ color: 'var(--accent-primary)' }}>Singh</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="desktop-nav">
            {navLinks.map(link => {
              const isActive = active === link.href.slice(1);
              return (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  aria-label={`Navigate to ${link.label}`}
                  style={{
                    background: isActive ? 'rgba(59, 130, 246, 0.1)' : 'none',
                    border: 'none',
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '6px 14px',
                    borderRadius: 8,
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit',
                    position: 'relative',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.background = 'none';
                    }
                  }}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Command palette trigger */}
            <motion.button
              onClick={onOpenPalette}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Open command palette"
              title="Command Palette (⌘K)"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                borderRadius: 8,
                border: '1px solid var(--border-default)',
                background: 'transparent',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                transition: 'all 0.2s ease',
              }}
            >
              <Command size={12} />
              <span className="desktop-nav" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>⌘K</span>
            </motion.button>

            {/* Mobile burger */}
            <motion.button
              onClick={() => setMobileOpen(o => !o)}
              whileTap={{ scale: 0.9 }}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                border: '1px solid var(--border-default)',
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
              }}
              className="mobile-nav-toggle"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                zIndex: 498,
              }}
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              role="dialog"
              aria-label="Navigation menu"
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: 280,
                background: 'var(--bg-secondary)',
                borderLeft: '1px solid var(--border-default)',
                zIndex: 499,
                padding: '80px 20px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              {navLinks.map((link, i) => {
                const isActive = active === link.href.slice(1);
                return (
                  <motion.button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{
                      background: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                      border: 'none',
                      color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      padding: '12px 16px',
                      borderRadius: 10,
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      textAlign: 'left',
                      fontFamily: 'inherit',
                      width: '100%',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {link.label}
                  </motion.button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) { .mobile-nav-toggle { display: none !important; } }
        @media (max-width: 767px) { .desktop-nav { display: none !important; } }
      `}</style>
    </>
  );
}
