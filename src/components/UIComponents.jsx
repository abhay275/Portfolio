import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Scroll Progress ─────────────────────────────────────────────
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
}

// ─── Loading Screen ───────────────────────────────────────────────
export function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('Initializing...');

  const steps = [
    'Initializing system...',
    'Loading modules...',
    'Compiling portfolio...',
    'Deploying interface...',
    'Ready.',
  ];

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setProgress(step * 20);
      setText(steps[Math.min(step, steps.length - 1)]);
      if (step >= 5) {
        clearInterval(interval);
        setTimeout(onComplete, 400);
      }
    }, 280);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ textAlign: 'center' }}>
        {/* Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          style={{
            width: 48,
            height: 48,
            border: '2px solid var(--border-default)',
            borderTop: '2px solid var(--accent-primary)',
            borderRadius: '50%',
            margin: '0 auto 28px',
          }}
        />
        <p className="font-mono" style={{
          color: 'var(--text-secondary)',
          fontSize: '0.82rem',
          marginBottom: 20,
          letterSpacing: '0.1em',
        }}>
          {text}
        </p>
        <div style={{
          width: 240,
          height: 2,
          background: 'var(--border-default)',
          borderRadius: 4,
          overflow: 'hidden',
          margin: '0 auto',
        }}>
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            style={{
              height: '100%',
              background: 'var(--accent-primary)',
              borderRadius: 4,
            }}
          />
        </div>
        <p className="font-mono" style={{
          color: 'var(--text-muted)',
          fontSize: '0.7rem',
          marginTop: 10,
        }}>
          {progress}%
        </p>
      </div>
    </motion.div>
  );
}

// ─── Command Palette ─────────────────────────────────────────────
export function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef(null);

  const commands = [
    { id: 'hero', label: 'Go to Home', icon: '⌂', section: '#hero' },
    { id: 'about', label: 'About Me', icon: '◉', section: '#about' },
    { id: 'skills', label: 'Skills', icon: '◆', section: '#skills' },
    { id: 'projects', label: 'Projects', icon: '▸', section: '#projects' },
    { id: 'experience', label: 'Experience', icon: '◈', section: '#experience' },
    { id: 'stats', label: 'Coding Stats', icon: '▪', section: '#stats' },
    { id: 'contact', label: 'Contact Me', icon: '✉', section: '#contact' },
    { id: 'github', label: 'Open GitHub', icon: '⊞', url: 'https://github.com/abhay275' },
    { id: 'linkedin', label: 'Open LinkedIn', icon: '⊡', url: 'https://www.linkedin.com/in/abhay-singh-b38b39279/' },
  ];

  const filtered = commands.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIdx(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIdx(i => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIdx(i => Math.max(i - 1, 0));
      }
      if (e.key === 'Enter' && filtered[selectedIdx]) {
        handleSelect(filtered[selectedIdx]);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose, filtered, selectedIdx]);

  const handleSelect = (cmd) => {
    if (cmd.url) window.open(cmd.url, '_blank');
    else if (cmd.section) {
      document.querySelector(cmd.section)?.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="command-palette-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="command-palette"
            role="dialog"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{
              padding: '12px 16px',
              borderBottom: '1px solid var(--border-default)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>⌘</span>
              <input
                ref={inputRef}
                value={query}
                onChange={e => { setQuery(e.target.value); setSelectedIdx(0); }}
                placeholder="Type a command or search..."
                aria-label="Search commands"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-sans)',
                }}
              />
              <kbd style={{
                color: 'var(--text-muted)',
                fontSize: '0.65rem',
                fontFamily: 'var(--font-mono)',
                padding: '2px 6px',
                background: 'var(--bg-card)',
                borderRadius: 4,
                border: '1px solid var(--border-default)',
              }}>ESC</kbd>
            </div>
            <div style={{ maxHeight: 320, overflowY: 'auto', padding: '6px' }}>
              {filtered.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '28px',
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem',
                }}>
                  No results found.
                </div>
              ) : (
                filtered.map((cmd, i) => (
                  <button
                    key={cmd.id}
                    onClick={() => handleSelect(cmd)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: i === selectedIdx ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                      border: 'none',
                      color: i === selectedIdx ? 'var(--text-primary)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '0.875rem',
                      fontFamily: 'var(--font-sans)',
                      transition: 'background 0.1s',
                    }}
                    onMouseEnter={() => setSelectedIdx(i)}
                  >
                    <span style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-default)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      flexShrink: 0,
                    }}>{cmd.icon}</span>
                    <span>{cmd.label}</span>
                    {cmd.url && <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '0.75rem' }}>↗</span>}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
