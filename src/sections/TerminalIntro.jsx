import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ChevronRight } from 'lucide-react';

const lines = [
  { delay: 0, text: '> Booting developer environment...', color: '#94a3b8' },
  { delay: 0.6, text: '> Loading modules: [AI/ML, FullStack, Security]', color: '#00d4ff' },
  { delay: 1.2, text: '> Initializing neural networks... ✓', color: '#06ffa5' },
  { delay: 1.8, text: '> Connecting to GitHub... ✓', color: '#06ffa5' },
  { delay: 2.4, text: '> Building portfolio interface...', color: '#7c3aed' },
  { delay: 3.0, text: '> All systems operational.', color: '#39ff14' },
  { delay: 3.4, text: '> Welcome to my portfolio. 🚀', color: '#ffffff' },
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
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5 }}
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
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        style={{ width: '100%', maxWidth: 680, boxShadow: '0 0 60px rgba(0,212,255,0.15)' }}
      >
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="terminal-dot" style={{ background: '#ff5f57' }} />
          <div className="terminal-dot" style={{ background: '#febc2e' }} />
          <div className="terminal-dot" style={{ background: '#28c840' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 12 }}>
            <Terminal size={14} style={{ color: '#00d4ff' }} />
            <span className="font-mono" style={{ color: '#475569', fontSize: '0.75rem' }}>
              portfolio — bash — 80×24
            </span>
          </div>
        </div>

        {/* Terminal Body */}
        <div style={{ padding: '24px', minHeight: 240 }}>
          {lines.map((line, i) => (
            visibleLines.includes(i) ? (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 10,
                }}
              >
                <ChevronRight size={12} style={{ color: '#00d4ff', flexShrink: 0 }} />
                <span
                  className="font-mono"
                  style={{
                    color: line.color,
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                  }}
                >
                  {line.text.replace('> ', '')}
                </span>
              </motion.div>
            ) : null
          ))}

          {/* Blinking cursor */}
          {!done && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ChevronRight size={12} style={{ color: '#00d4ff' }} />
              <span className="typing-cursor" style={{ width: '8px', height: '14px' }} />
            </div>
          )}

          {done && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ marginTop: 16, textAlign: 'center' }}
            >
              <div
                className="font-mono"
                style={{
                  color: '#39ff14',
                  fontSize: '0.75rem',
                  letterSpacing: '0.2em',
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
