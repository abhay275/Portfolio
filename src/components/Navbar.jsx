import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Menu, X, Command } from 'lucide-react';
import { ThemeToggle } from './UIComponents';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Tech', href: '#tech' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Stats', href: '#stats' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ isDark, toggleTheme, onOpenPalette }) {
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
      { threshold: 0.4 }
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
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
          padding: '0 24px',
          transition: 'all 0.3s ease',
          ...(scrolled ? {
            background: 'rgba(2,4,9,0.92)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(0,212,255,0.1)',
            boxShadow: '0 0 40px rgba(0,0,0,0.5)',
          } : {}),
        }}
      >
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <a
            href="#hero"
            onClick={e => { e.preventDefault(); scrollTo('#hero'); }}
            data-hover="true"
            style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
          >
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(0,212,255,0.3)',
            }}>
              <Terminal size={16} style={{ color: 'white' }} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em', color: '#e2e8f0' }}>
              Abhay <span style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Portfolio</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }} className="desktop-nav">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                data-hover="true"
                style={{
                  background: 'none',
                  border: 'none',
                  color: active === link.href.slice(1) ? '#00d4ff' : '#64748b',
                  cursor: 'pointer',
                  padding: '8px 14px',
                  borderRadius: 8,
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                  position: 'relative',
                }}
                onMouseEnter={e => { if (active !== link.href.slice(1)) e.currentTarget.style.color = '#94a3b8'; }}
                onMouseLeave={e => { if (active !== link.href.slice(1)) e.currentTarget.style.color = '#64748b'; }}
              >
                {link.label}
                {active === link.href.slice(1) && (
                  <motion.div
                    layoutId="nav-indicator"
                    style={{
                      position: 'absolute',
                      bottom: 4,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: '#00d4ff',
                      boxShadow: '0 0 6px #00d4ff',
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Command palette trigger */}
            <motion.button
              onClick={onOpenPalette}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-hover="true"
              title="Command Palette (⌘K)"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 12px',
                borderRadius: 8,
                border: '1px solid rgba(0,212,255,0.2)',
                background: 'rgba(0,212,255,0.05)',
                color: '#64748b',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontFamily: 'monospace',
              }}
            >
              <Command size={13} style={{ color: '#00d4ff' }} />
              <span style={{ display: 'none' }}>⌘K</span>
            </motion.button>

            <ThemeToggle isDark={isDark} toggle={toggleTheme} />

            {/* Mobile burger */}
            <motion.button
              onClick={() => setMobileOpen(o => !o)}
              whileTap={{ scale: 0.9 }}
              data-hover="true"
              style={{
                width: 44,
                height: 44,
                borderRadius: 8,
                border: '1px solid rgba(0,212,255,0.2)',
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#94a3b8',
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
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            style={{
              position: 'fixed',
              top: 72,
              right: 0,
              bottom: 0,
              width: 260,
              background: 'rgba(2,4,9,0.97)',
              backdropFilter: 'blur(30px)',
              borderLeft: '1px solid rgba(0,212,255,0.15)',
              zIndex: 499,
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                style={{
                  background: active === link.href.slice(1) ? 'rgba(0,212,255,0.08)' : 'transparent',
                  border: 'none',
                  color: active === link.href.slice(1) ? '#00d4ff' : '#94a3b8',
                  cursor: 'pointer',
                  padding: '14px 16px',
                  borderRadius: 10,
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  textAlign: 'left',
                  fontFamily: 'inherit',
                  width: '100%',
                }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) { .mobile-nav-toggle { display: none !important; } }
        @media (max-width: 767px) { .desktop-nav { display: none !important; } }
      `}</style>
    </>
  );
}
