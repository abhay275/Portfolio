import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Code2, Cloud, Brain, BookOpen, Target } from 'lucide-react';

const focusAreas = [
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Implementing threat detection, incident response workflows, and securing systems against advanced attack vectors.',
    accent: '#3B82F6',
  },
  {
    icon: Code2,
    title: 'Full Stack Development',
    description: 'Architecting end-to-end applications with modern frameworks, focusing on scalable APIs and responsive UIs.',
    accent: '#06B6D4',
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description: 'Deploying highly available infrastructure on cloud platforms with automated CI/CD pipelines and security-first principles.',
    accent: '#22C55E',
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Leveraging machine learning for anomaly detection and data analysis to solve complex operational challenges.',
    accent: '#F59E0B',
  },
];

const journeyItems = [
  {
    year: '2022',
    title: 'Started B.Tech in Computer Science',
    description: 'Built foundational expertise in data structures, algorithms, and systems design.',
    icon: BookOpen,
  },
  {
    year: '2023',
    title: 'Security Engineering Focus',
    description: 'Transitioned focus to security engineering, mastering network defense, threat modeling, and secure coding practices.',
    icon: Shield,
  },
  {
    year: '2024',
    title: 'Shipping Production Systems',
    description: 'Engineered and deployed production-grade security tooling and web applications, collaborating in national-level technical events.',
    icon: Target,
  },
];

function FocusCard({ area, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = area.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass-card card-interactive"
      style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${area.accent}60, transparent)` }} />

      <div style={{ width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${area.accent}15`, border: `1px solid ${area.accent}30`, marginBottom: 20, boxShadow: `0 0 20px ${area.accent}20` }}>
        <Icon size={24} style={{ color: area.accent }} />
      </div>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 12, color: 'var(--text-primary)' }}>{area.title}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{area.description}</p>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" style={{ padding: '120px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64, textAlign: 'center' }}
        >
          <p className="section-tag" style={{ marginBottom: 14, justifyContent: 'center' }}>About Me</p>
          <h2 className="section-title" style={{ marginBottom: 20 }}>
            Engineering secure software, <span className="text-gradient">one commit at a time.</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 680, margin: '0 auto', lineHeight: 1.8 }}>
            I am a <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Software Engineer</span> passionate about the intersection of <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>cybersecurity</span> and <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>full-stack development</span>. I focus on architecting reliable systems, writing maintainable code, and solving complex technical challenges.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 64 }}>
          {focusAreas.map((area, i) => (
            <FocusCard key={area.title} area={area} index={i} />
          ))}
        </div>

        {/* Journey Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-panel"
          style={{ padding: '48px', maxWidth: 900, margin: '0 auto' }}
        >
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 36, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-primary)', display: 'inline-block', boxShadow: '0 0 10px var(--accent-primary)' }} />
            My Journey
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {journeyItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} style={{ display: 'flex', gap: 24, paddingBottom: i < journeyItems.length - 1 ? 32 : 0, position: 'relative' }}>
                  {i < journeyItems.length - 1 && (
                    <div style={{ position: 'absolute', left: 23, top: 48, bottom: 0, width: 2, background: 'var(--border-default)' }} />
                  )}

                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', zIndex: 1 }}>
                    <Icon size={20} style={{ color: 'var(--accent-primary)' }} />
                  </div>

                  <div style={{ flex: 1, paddingTop: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{item.title}</span>
                      <span className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: 20 }}>{item.year}</span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
