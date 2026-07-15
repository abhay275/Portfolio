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
      className="card card-interactive"
      style={{
        padding: '28px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${area.accent}40, transparent)`,
      }} />

      <div style={{
        width: 44,
        height: 44,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `${area.accent}10`,
        border: `1px solid ${area.accent}20`,
        marginBottom: 18,
      }}>
        <Icon size={20} style={{ color: area.accent }} />
      </div>

      <h3 style={{
        fontSize: '1rem',
        fontWeight: 600,
        marginBottom: 10,
        color: 'var(--text-primary)',
      }}>
        {area.title}
      </h3>
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '0.875rem',
        lineHeight: 1.7,
      }}>
        {area.description}
      </p>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" style={{ padding: '120px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 64 }}
      >
        <p className="section-tag" style={{ marginBottom: 14 }}>About Me</p>
        <h2 className="section-title" style={{ marginBottom: 20 }}>
          Engineering secure software,{' '}
          <span className="text-gradient">one commit at a time.</span>
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.05rem',
          maxWidth: 640,
          lineHeight: 1.8,
        }}>
          I am a <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Software Engineer</span> passionate about the intersection of{' '}
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>cybersecurity</span> and{' '}
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>full-stack development</span>.
          I focus on architecting reliable systems, writing maintainable code, and solving complex
          technical challenges.
        </p>
      </motion.div>

      {/* Journey Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="card"
        style={{
          padding: '32px',
          marginBottom: 48,
        }}
      >
        <h3 style={{
          fontSize: '0.9rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: 28,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--accent-primary)',
            display: 'inline-block',
          }} />
          My Journey
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {journeyItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 20,
                  paddingBottom: i < journeyItems.length - 1 ? 28 : 0,
                  position: 'relative',
                }}
              >
                {/* Timeline line */}
                {i < journeyItems.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    left: 19,
                    top: 40,
                    bottom: 0,
                    width: 1,
                    background: 'var(--border-default)',
                  }} />
                )}

                {/* Dot */}
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-default)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 1,
                }}>
                  <Icon size={16} style={{ color: 'var(--accent-primary)' }} />
                </div>

                <div style={{ flex: 1, paddingTop: 2 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 6,
                    flexWrap: 'wrap',
                  }}>
                    <span style={{
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      color: 'var(--text-primary)',
                    }}>
                      {item.title}
                    </span>
                    <span className="font-mono" style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.72rem',
                    }}>
                      {item.year}
                    </span>
                  </div>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.85rem',
                    lineHeight: 1.7,
                  }}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Focus areas grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 16,
      }}>
        {focusAreas.map((area, i) => (
          <FocusCard key={area.title} area={area} index={i} />
        ))}
      </div>
    </section>
  );
}
