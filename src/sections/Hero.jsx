import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, ArrowRight } from 'lucide-react';
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa';

const TYPING_WORDS = [
  'Architecting resilient systems',
  'Implementing threat intelligence',
  'Engineering high-performance applications',
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
      }, 70);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      }, 40);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words]);

  return displayed;
}

export default function Hero() {
  const typed = useTypingEffect(TYPING_WORDS);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
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
      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 600,
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Main content */}
      <div style={{ maxWidth: 780, textAlign: 'center', position: 'relative', zIndex: 2 }}>

        {/* Availability badge */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate="show"
          style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 40,
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.04em',
            }}
          >
            <span style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'var(--color-success)',
              display: 'inline-block',
            }} />
            Available for opportunities
          </div>
        </motion.div>

        {/* Name */}
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show">
          <h1 style={{ marginBottom: 16 }}>
            <span style={{
              display: 'block',
              fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
              letterSpacing: '0.2em',
              marginBottom: 14,
              textTransform: 'uppercase',
              fontWeight: 400,
            }}>
              Hello, I'm
            </span>
            <span style={{
              display: 'block',
              fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              color: 'var(--text-primary)',
            }}>
              Abhay Singh
            </span>
          </h1>
        </motion.div>

        {/* Typing subtitle */}
        <motion.div
          custom={2} variants={fadeUp} initial="hidden" animate="show"
          style={{
            marginBottom: 24,
            minHeight: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{
            fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
            fontWeight: 600,
            color: 'var(--accent-primary)',
          }}>
            {typed}
          </span>
          <span className="typing-cursor" style={{ height: '1.3rem' }} />
        </motion.div>

        {/* Bio */}
        <motion.p
          custom={3} variants={fadeUp} initial="hidden" animate="show"
          style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
            maxWidth: 560,
            margin: '0 auto 36px',
            lineHeight: 1.8,
          }}
        >
          I build <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>secure, scalable systems</span> and
          ship <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>production-ready products</span>.
          Passionate about cybersecurity, cloud infrastructure, and crafting
          software that solves real problems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={4} variants={fadeUp} initial="hidden" animate="show"
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}
        >
          <motion.a
            href="#projects"
            className="btn-primary"
            onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
          >
            View Projects
            <ArrowRight size={15} />
          </motion.a>

          <motion.a
            href="/resume.pdf"
            download
            className="btn-outline"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
          >
            <Download size={15} />
            Resume
          </motion.a>

          <motion.a
            href="#contact"
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-outline"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
          >
            <Mail size={15} />
            Contact
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          custom={5} variants={fadeUp} initial="hidden" animate="show"
          style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 56 }}
        >
          {[
            { icon: Github, href: 'https://github.com/abhay275', label: 'GitHub' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/abhay-singh-b38b39279/', label: 'LinkedIn' },
          ].map(s => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                border: '1px solid var(--border-default)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--border-hover)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-default)';
                e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              <s.icon size={18} />
            </motion.a>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          custom={6} variants={fadeUp} initial="hidden" animate="show"
          style={{
            display: 'flex',
            gap: 48,
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
                fontSize: 'clamp(1.4rem, 3.5vw, 1.8rem)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}>
                {s.value}
              </div>
              <div className="font-mono" style={{
                color: 'var(--text-muted)',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginTop: 4,
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          color: 'var(--text-muted)',
        }}
      >
        <span className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.2em' }}>SCROLL</span>
        <div style={{
          width: 1,
          height: 32,
          background: 'linear-gradient(to bottom, var(--accent-primary), transparent)',
        }} />
      </motion.div>
    </section>
  );
}
