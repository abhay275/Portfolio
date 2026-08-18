import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ChevronRight } from 'lucide-react';

const lines = [
  { delay: 0, text: 'Initializing deployment environment...', color: 'var(--text-secondary)' },
  { delay: 0.6, text: 'Loading modules: [Docker, CI/CD, Infrastructure]', color: 'var(--accent-primary)' },
  { delay: 1.2, text: 'Verifying container health... ✓', color: 'var(--color-success)' },
  { delay: 1.8, text: 'Establishing secure backend connection... ✓', color: 'var(--color-success)' },
  { delay: 2.4, text: 'Automating release pipeline...', color: 'var(--accent-secondary)' },
  { delay: 3.0, text: 'All systems operational.', color: 'var(--color-success)' },
  { delay: 3.4, text: 'Deployment successful.', color: 'var(--text-primary)' },
];

export default function TerminalIntro({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    lines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
        if (i === lines.length - 1) {
          setTimeout(() => {
            setDone(true);
            setTimeout(onComplete, 600);
          }, 700);
        }
      }, line.delay * 1000);
    });
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99990,
        padding: '20px',
      }}
    >
      <motion.div
        className="terminal-window"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          width: '100%',
          maxWidth: 620,
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="terminal-dot" style={{ background: '#ff5f57' }} />
          <div className="terminal-dot" style={{ background: '#febc2e' }} />
          <div className="terminal-dot" style={{ background: '#28c840' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 12 }}>
            <Terminal size={13} style={{ color: 'var(--text-muted)' }} />
            <span className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>
              portfolio — zsh — 80×24
            </span>
          </div>
        </div>

        {/* Terminal Body */}
        <div style={{ padding: '20px 24px', minHeight: 220 }}>
          {lines.map((line, i) => (
            visibleLines.includes(i) ? (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <ChevronRight size={11} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                <span
                  className="font-mono"
                  style={{
                    color: line.color,
                    fontSize: '0.82rem',
                    lineHeight: 1.5,
                  }}
                >
                  {line.text}
                </span>
              </motion.div>
            ) : null
          ))}

          {/* Blinking cursor */}
          {!done && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ChevronRight size={11} style={{ color: 'var(--accent-primary)' }} />
              <span className="typing-cursor" style={{ width: '7px', height: '13px' }} />
            </div>
          )}

          {done && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ marginTop: 14, textAlign: 'center' }}
            >
              <div
                className="font-mono"
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                [ Launching Interface... ]
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
