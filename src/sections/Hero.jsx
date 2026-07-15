import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa';
import Premium3DModel from '../components/3d/Premium3DModel';

const TYPING_WORDS = [
  'Cybersecurity Enthusiast',
  'SOC Analyst Aspirant',
  'Full Stack Developer',
  'Android Developer',
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
    hidden: { opacity: 0, y: 30 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '160px 24px 80px',
      }}
    >
      {/* 3D Premium Model Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.4, pointerEvents: 'none' }}>
        <Premium3DModel />
      </div>

      <div style={{
        maxWidth: 900,
        margin: '0 auto',
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2,
      }}>
        
        {/* Availability badge */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <div className="glass-panel" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 40,
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-mono)',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-success)', display: 'inline-block', boxShadow: '0 0 10px var(--color-success)' }} />
            Available for Opportunities
          </div>
        </motion.div>

        {/* Greeting above name */}
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show">
          <span style={{ 
            display: 'block', 
            color: 'var(--accent-primary)', 
            fontWeight: 700, 
            letterSpacing: '0.15em', 
            textTransform: 'uppercase', 
            fontSize: '1rem',
            marginBottom: '16px'
          }}>
            Hello! I'm
          </span>
        </motion.div>

        {/* Name */}
        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show">
          <h1 style={{
            fontSize: 'clamp(3.5rem, 8vw, 6rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.04em',
            color: 'var(--text-primary)',
            marginBottom: 20,
          }}>
            Abhay Singh
          </h1>
        </motion.div>

        {/* Role Animation */}
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" style={{ marginBottom: 32, minHeight: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--accent-secondary)' }}>{typed}</span>
          </span>
          <span className="typing-cursor" style={{ height: '2rem', background: 'var(--accent-secondary)' }} />
        </motion.div>

        {/* Short Description */}
        <motion.p custom={4} variants={fadeUp} initial="hidden" animate="show" style={{
          color: 'var(--text-secondary)',
          fontSize: '1.15rem',
          maxWidth: 680,
          margin: '0 auto 48px',
          lineHeight: 1.7,
        }}>
          Architecting intelligent systems and secure cloud infrastructure. Merging precision engineering with modern design to build premium digital experiences and enterprise security solutions.
        </motion.p>

        {/* CTAs */}
        <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          <a href="#projects" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', padding: '14px 32px', fontSize: '1.05rem', borderRadius: 'var(--radius-md)' }}>
            View Projects
            <ArrowRight size={18} />
          </a>
          <a href="/resume.pdf" download className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', padding: '14px 32px', fontSize: '1.05rem', borderRadius: 'var(--radius-md)' }}>
            <Download size={18} />
            Resume
          </a>
        </motion.div>

        {/* Social Icons */}
        <motion.div custom={6} variants={fadeUp} initial="hidden" animate="show" style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
          {[
            { icon: Github, href: 'https://github.com/abhay275', label: 'GitHub' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/abhay-singh-b38b39279/', label: 'LinkedIn' },
          ].map(s => (
            <motion.a
              key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              className="glass-card"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-secondary)', textDecoration: 'none', borderRadius: '50%'
              }}
            >
              <s.icon size={24} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          color: 'var(--text-muted)',
        }}
      >
        <span className="font-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.2em' }}>SCROLL</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--accent-primary), transparent)' }} />
      </motion.div>

    </section>
  );
}
