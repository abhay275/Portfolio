import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Trophy, Bot, GitBranch, Zap } from 'lucide-react';

const events = [
  {
    year: '2024',
    title: 'Smart India Hackathon',
    description: 'Collaborated in a cross-functional team to architect and pitch a scalable technical solution under strict time constraints at a national-level competition.',
    icon: Trophy,
    type: 'Hackathon',
    accent: '#F59E0B',
  },
  {
    year: '2024',
    title: 'Hacknovate',
    description: 'Prototyped and pitched an innovative technical solution addressing community challenges, focusing on system reliability and user experience.',
    icon: Zap,
    type: 'Hackathon',
    accent: '#3B82F6',
  },
  {
    year: '2023',
    title: 'ROBORACE',
    description: 'Engineered the software algorithms and hardware integration for an autonomous robotics platform, optimizing for real-time sensor processing.',
    icon: Bot,
    type: 'Competition',
    accent: '#06B6D4',
  },
  {
    year: '2023–Present',
    title: 'Open Source Contributions',
    description: 'Actively contributing to open-source repositories, focusing on developer tooling, system security, and community knowledge sharing.',
    icon: GitBranch,
    type: 'Open Source',
    accent: '#22C55E',
  },
];

function TimelineItem({ event, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const Icon = event.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{
        display: 'flex',
        gap: 20,
        paddingLeft: 48,
        position: 'relative',
        paddingBottom: index < events.length - 1 ? 32 : 0,
      }}
    >
      {/* Timeline dot */}
      <div style={{
        position: 'absolute',
        left: 15,
        top: 6,
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: event.accent,
        border: '2px solid var(--bg-primary)',
        zIndex: 1,
      }} />

      {/* Card */}
      <div
        className="card"
        style={{
          padding: '22px',
          flex: 1,
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 14,
          flexWrap: 'wrap',
        }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: 9,
            background: `${event.accent}10`,
            border: `1px solid ${event.accent}18`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Icon size={16} style={{ color: event.accent }} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 6,
              flexWrap: 'wrap',
            }}>
              <span
                className="badge font-mono"
                style={{
                  background: `${event.accent}10`,
                  color: event.accent,
                  border: `1px solid ${event.accent}18`,
                }}
              >
                {event.type}
              </span>
              <span className="font-mono" style={{
                color: 'var(--text-muted)',
                fontSize: '0.72rem',
              }}>
                {event.year}
              </span>
            </div>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: 8,
            }}>
              {event.title}
            </h3>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              lineHeight: 1.7,
            }}>
              {event.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="experience"
      style={{
        padding: '120px 24px',
        background: 'var(--bg-secondary)',
      }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <p className="section-tag" style={{ justifyContent: 'center', marginBottom: 14 }}>
            Journey
          </p>
          <h2 className="section-title" style={{ marginBottom: 18 }}>
            Projects &{' '}
            <span className="text-gradient">Leadership</span>
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            maxWidth: 480,
            margin: '0 auto',
            lineHeight: 1.7,
            fontSize: '0.95rem',
          }}>
            Hackathons, competitions, and open-source contributions that shaped my engineering mindset.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          <div className="timeline-line" />
          {events.map((event, i) => (
            <TimelineItem key={event.title} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
