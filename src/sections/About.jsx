import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Code2, Shield, Rocket, Zap, Globe } from 'lucide-react';

const cards = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Designing neural networks, training models, and deploying intelligent systems that learn and adapt.',
    color: '#00d4ff',
    glow: 'rgba(0,212,255,0.15)',
  },
  {
    icon: Code2,
    title: 'Full Stack Development',
    description: 'Building end-to-end web applications from pixel-perfect UIs to robust backend APIs and databases.',
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.15)',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Exploring ethical hacking, secure coding practices, and building systems resilient to modern threats.',
    color: '#39ff14',
    glow: 'rgba(57,255,20,0.15)',
  },
  {
    icon: Rocket,
    title: 'Scalable Products',
    description: 'Architecting and shipping products that handle real-world load with clean, maintainable code.',
    color: '#ff006e',
    glow: 'rgba(255,0,110,0.15)',
  },
  {
    icon: Zap,
    title: 'Problem Solving',
    description: 'Passionate about algorithmic challenges, competitive programming, and crafting elegant solutions.',
    color: '#06ffa5',
    glow: 'rgba(6,255,165,0.15)',
  },
  {
    icon: Globe,
    title: 'Open Source',
    description: 'Contributing to the open source community and building tools that empower developers worldwide.',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.15)',
  },
];

function Card({ card, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = card.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-card"
      style={{
        borderRadius: 16,
        padding: '28px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
        opacity: 0.7,
      }} />
      <div style={{
        position: 'absolute',
        top: -30,
        right: -30,
        width: 100,
        height: 100,
        background: `radial-gradient(circle, ${card.glow} 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{
        width: 48,
        height: 48,
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: card.glow,
        border: `1px solid ${card.color}30`,
        marginBottom: 18,
      }}>
        <Icon size={22} style={{ color: card.color }} />
      </div>

      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 10, color: '#e2e8f0' }}>
        {card.title}
      </h3>
      <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.7 }}>
        {card.description}
      </p>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: 70 }}
      >
        <p className="section-tag" style={{ marginBottom: 16 }}>About Me</p>
        <h2 className="section-title" style={{ marginBottom: 24 }}>
          <span style={{ color: '#e2e8f0' }}>Crafting the </span>
          <span className="text-gradient">Future</span>
          <span style={{ color: '#e2e8f0' }}>, one commit at a time.</span>
        </h2>
        <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: 680, lineHeight: 1.8 }}>
          I'm a passionate developer at the intersection of <span style={{ color: '#00d4ff' }}>artificial intelligence</span> and
          full-stack engineering. I love turning complex problems into elegant, performant solutions
          and shipping products that people actually use.
        </p>
      </motion.div>

      {/* Currently Building Banner */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass neon-border"
        style={{
          borderRadius: 12,
          padding: '18px 24px',
          marginBottom: 60,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <span className="font-mono" style={{ color: '#39ff14', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
          {'// CURRENTLY BUILDING:'}
        </span>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {['🤖 AI-Powered SaaS Platform', '🔐 Secure Auth System', '📊 ML Pipeline'].map((item, i) => (
            <span
              key={i}
              className="font-mono"
              style={{
                color: '#00d4ff',
                fontSize: '0.82rem',
                padding: '4px 12px',
                background: 'rgba(0,212,255,0.08)',
                borderRadius: 6,
                border: '1px solid rgba(0,212,255,0.15)',
              }}
            >
              {item}
            </span>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#39ff14', boxShadow: '0 0 8px #39ff14' }} />
          <span className="font-mono" style={{ color: '#39ff14', fontSize: '0.72rem' }}>LIVE</span>
        </div>
      </motion.div>

      {/* Cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 24,
      }}>
        {cards.map((card, i) => (
          <Card key={card.title} card={card} index={i} />
        ))}
      </div>
    </section>
  );
}
