import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, ArrowRight, Sparkles, Code2 } from 'lucide-react';

const TYPING_WORDS = [
  'AI/ML Developer',
  'Full Stack Engineer',
  'Problem Solver',
  'Open Source Builder',
  'Tech Founder',
];

function useTypingEffect(words) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx(c => c + 1);
      }, 80);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      }, 45);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words]);

  return displayed;
}

// Floating code snippet for decoration
function CodeSnippet({ style }) {
  return (
    <div
      className="terminal-window font-mono animate-float"
      style={{
        fontSize: '0.65rem',
        padding: '12px',
        opacity: 0.4,
        maxWidth: 220,
        ...style,
      }}
    >
      <div style={{ color: '#7c3aed' }}>{'const'} <span style={{ color: '#00d4ff' }}>buildFuture</span> {'= async () => {'}</div>
      <div style={{ color: '#94a3b8', paddingLeft: 16 }}>{'const ai = await train(model);'}</div>
      <div style={{ color: '#94a3b8', paddingLeft: 16 }}>{'return deploy(ai);'}</div>
      <div style={{ color: '#7c3aed' }}>{'}'}</div>
    </div>
  );
}

export default function Hero() {
  const typed = useTypingEffect(TYPING_WORDS);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  return (
    <section
      id="hero"
      className="grid-bg"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 24px 80px',
      }}
    >
      {/* Radial glows */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '15%',
        width: 500,
        height: 500,
        background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        width: 400,
        height: 400,
        background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Floating code decorations */}
      <CodeSnippet style={{ position: 'absolute', top: '18%', right: '5%', animationDelay: '0s', display: 'none' }} />

      {/* Main content */}
      <div style={{ maxWidth: 860, textAlign: 'center', position: 'relative', zIndex: 2 }}>

        {/* Badge */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate="show"
          style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}
        >
          <div
            className="glass neon-border font-mono"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 18px',
              borderRadius: 40,
              fontSize: '0.78rem',
              color: '#00d4ff',
              letterSpacing: '0.1em',
            }}
          >
            <Sparkles size={13} />
            Available for exciting opportunities
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#39ff14', boxShadow: '0 0 8px #39ff14', display: 'inline-block', animation: 'pulse-glow 1.5s ease-in-out infinite' }} />
          </div>
        </motion.div>

        {/* Name */}
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show">
          <h1 style={{ marginBottom: 16 }}>
            <span style={{ display: 'block', fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', fontFamily: 'var(--font-mono)', color: '#475569', letterSpacing: '0.3em', marginBottom: 12, textTransform: 'uppercase' }}>
              {'<'}Hello, world!{' />'}
            </span>
            <span style={{
              display: 'block',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #ffffff 20%, #00d4ff 50%, #7c3aed 80%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 40px rgba(0,212,255,0.25))',
            }}>
              Abhay Singh
            </span>
          </h1>
        </motion.div>

        {/* Typing subtitle */}
        <motion.div
          custom={2} variants={fadeUp} initial="hidden" animate="show"
          style={{ marginBottom: 28, minHeight: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0 }}
        >
          <span style={{
            fontSize: 'clamp(1.2rem, 3.5vw, 1.8rem)',
            fontWeight: 600,
            background: 'linear-gradient(135deg, #06ffa5, #00d4ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {typed}
          </span>
          <span className="typing-cursor" style={{ height: '1.5rem' }} />
        </motion.div>

        {/* Bio */}
        <motion.p
          custom={3} variants={fadeUp} initial="hidden" animate="show"
          style={{
            color: '#94a3b8',
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            maxWidth: 620,
            margin: '0 auto 40px',
            lineHeight: 1.8,
          }}
        >
          I build <span style={{ color: '#00d4ff' }}>intelligent systems</span> and{' '}
          <span style={{ color: '#7c3aed' }}>scalable products</span> that push boundaries.
          Passionate about AI/ML, full-stack development, and crafting impactful tech experiences
          that make a real difference.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={4} variants={fadeUp} initial="hidden" animate="show"
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}
        >
          <motion.a
            href="#projects"
            className="btn-primary"
            onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            data-hover="true"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', fontSize: '0.95rem' }}
          >
            <ArrowRight size={16} />
            View Projects
          </motion.a>

          <motion.a
            href="/resume.pdf"
            download
            className="btn-outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            data-hover="true"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', fontSize: '0.95rem' }}
          >
            <Download size={16} />
            Resume
          </motion.a>

          <motion.a
            href="#contact"
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            data-hover="true"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '0.75rem 2rem',
              borderRadius: 8,
              border: '1px solid rgba(124,58,237,0.5)',
              color: '#a78bfa',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              background: 'rgba(124,58,237,0.05)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.15)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(124,58,237,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.05)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <Mail size={16} />
            Contact Me
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          custom={5} variants={fadeUp} initial="hidden" animate="show"
          style={{
            display: 'flex',
            gap: 40,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {[
            { label: 'Projects Built', value: '20+' },
            { label: 'GitHub Commits', value: '500+' },
            { label: 'Technologies', value: '15+' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #00d4ff, #06ffa5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {s.value}
              </div>
              <div className="font-mono" style={{ color: '#475569', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          color: '#475569',
        }}
      >
        <span className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.2em' }}>SCROLL</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, #00d4ff, transparent)' }} />
      </motion.div>
    </section>
  );
}
