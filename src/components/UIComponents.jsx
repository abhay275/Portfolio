import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Custom Cursor ───────────────────────────────────────────────
export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animFrame;

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      animFrame = requestAnimationFrame(animateRing);
    };

    const handleHoverIn = () => setIsHovering(true);
    const handleHoverOut = () => setIsHovering(false);

    document.addEventListener('mousemove', move);
    animFrame = requestAnimationFrame(animateRing);

    const interactables = document.querySelectorAll('a, button, [data-hover]');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleHoverIn);
      el.addEventListener('mouseleave', handleHoverOut);
    });

    return () => {
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ transform: isHovering ? 'translate(-50%, -50%) scale(2)' : 'translate(-50%, -50%)' }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          width: isHovering ? '60px' : '40px',
          height: isHovering ? '60px' : '40px',
          borderColor: isHovering ? 'rgba(57, 255, 20, 0.5)' : 'rgba(0, 212, 255, 0.5)',
        }}
      />
    </>
  );
}

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

  return <div className="scroll-progress" style={{ width: `${progress}%` }} />;
}

// ─── Animated Particles Background ───────────────────────────────
export function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.3,
      color: ['rgba(0,212,255,', 'rgba(124,58,237,', 'rgba(6,255,165,'][Math.floor(Math.random() * 3)],
      opacity: Math.random() * 0.6 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw connections
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(q => {
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,212,255,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        });
      });

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.6,
      }}
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
      transition={{ duration: 0.6 }}
    >
      <div style={{ textAlign: 'center' }}>
        {/* Animated logo */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          style={{
            width: 80, height: 80,
            border: '2px solid transparent',
            borderTop: '2px solid #00d4ff',
            borderRight: '2px solid #7c3aed',
            borderRadius: '50%',
            margin: '0 auto 32px',
            boxShadow: '0 0 30px rgba(0,212,255,0.4)',
          }}
        />
        <p className="font-mono" style={{ color: '#00d4ff', fontSize: '0.85rem', marginBottom: 24, letterSpacing: '0.2em' }}>
          {text}
        </p>
        <div style={{
          width: 300,
          height: 2,
          background: 'rgba(0,212,255,0.15)',
          borderRadius: 4,
          overflow: 'hidden',
        }}>
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #00d4ff, #7c3aed)',
              boxShadow: '0 0 10px #00d4ff',
              borderRadius: 4,
            }}
          />
        </div>
        <p className="font-mono" style={{ color: 'rgba(0,212,255,0.5)', fontSize: '0.7rem', marginTop: 12 }}>
          {progress}%
        </p>
      </div>
    </motion.div>
  );
}

// ─── Command Palette ─────────────────────────────────────────────
export function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  const commands = [
    { id: 'hero', label: 'Go to Home', icon: '🏠', section: '#hero' },
    { id: 'about', label: 'About Me', icon: '👤', section: '#about' },
    { id: 'tech', label: 'Tech Stack', icon: '⚡', section: '#tech' },
    { id: 'projects', label: 'Projects', icon: '🚀', section: '#projects' },
    { id: 'experience', label: 'Experience', icon: '📋', section: '#experience' },
    { id: 'stats', label: 'Coding Stats', icon: '📊', section: '#stats' },
    { id: 'contact', label: 'Contact Me', icon: '✉️', section: '#contact' },
    { id: 'github', label: 'Open GitHub', icon: '🐙', url: 'https://github.com/abhay275' },
    { id: 'linkedin', label: 'Open LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/abhay-singh-b38b39279/' },
  ];

  const filtered = commands.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

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
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(0,212,255,0.15)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ color: '#00d4ff', fontSize: '1rem' }}>⌘</span>
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="font-mono"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#e2e8f0',
                  fontSize: '0.9rem',
                }}
              />
              <span style={{ color: '#475569', fontSize: '0.7rem', fontFamily: 'monospace' }}>ESC</span>
            </div>
            <div style={{ maxHeight: 360, overflowY: 'auto', padding: '8px' }}>
              {filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px', color: '#475569', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                  No commands found.
                </div>
              ) : (
                filtered.map((cmd, i) => (
                  <motion.button
                    key={cmd.id}
                    onClick={() => handleSelect(cmd)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: 'transparent',
                      border: 'none',
                      color: '#e2e8f0',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '0.875rem',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,212,255,0.08)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <span style={{ fontSize: '1.1rem' }}>{cmd.icon}</span>
                    <span>{cmd.label}</span>
                    {cmd.url && <span style={{ marginLeft: 'auto', color: '#475569', fontSize: '0.7rem' }}>↗</span>}
                  </motion.button>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Dark/Light Toggle ────────────────────────────────────────────
export function ThemeToggle({ isDark, toggle }) {
  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{
        width: 44,
        height: 44,
        borderRadius: '50%',
        border: '1px solid rgba(0,212,255,0.3)',
        background: 'rgba(6,13,26,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '1.2rem',
      }}
      data-hover="true"
      title="Toggle theme"
    >
      {isDark ? '☀️' : '🌙'}
    </motion.button>
  );
}
