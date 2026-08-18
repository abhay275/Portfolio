import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Trophy, Bot, GitBranch, Zap, Cloud } from 'lucide-react';

const events = [
  {
    year: 'Jan 2026 – Present',
    title: '💼 Mobile Application Developer — Freelance',
    description: [
      'Developed and deployed web and Android applications using React, Flutter, FastAPI, PostgreSQL, Firebase, and REST APIs.',
      'Worked with CI/CD workflows, application deployment, environment configuration, monitoring, and production support.',
      'Supported backend services and API integrations across development and production environments.',
      'Assisted with deployment workflows, debugging, release activities, and application reliability.',
      'Coordinated technical deliverables and development workflows to support timely project releases.',
    ],
    icon: GitBranch,
    type: 'Remote',
    accent: '#22C55E',
  },
  {
    year: '2025',
    title: '🥇 1st Position — ROBORACE',
    description: 'Secured 1st Position in the ROBORACE competition during Exuberance 2025.',
    icon: Trophy,
    type: 'Competition',
    accent: '#F59E0B',
  },
  {
    year: '2026',
    title: '🏆 Top 10 — Hacknovate 7.0',
    description: 'Selected among the Top 10 Finalists for building an AI-powered solution addressing real-world challenges.',
    icon: Zap,
    type: 'Hackathon',
    accent: '#3B82F6',
  },
  {
    year: '2026',
    title: '🥈 Silver Medal — Cricket Tournament',
    description: 'Secured a Silver Medal in the Cricket Tournament.',
    icon: Award,
    type: 'Sports',
    accent: '#9CA3AF',
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
        gap: 30,
        position: 'relative',
        paddingBottom: index < events.length - 1 ? 48 : 0,
      }}
    >
      {/* Timeline line connecting items */}
      {index < events.length - 1 && (
        <div style={{ position: 'absolute', left: 24, top: 48, bottom: 0, width: 2, background: 'var(--border-default)' }} />
      )}

      {/* Icon node */}
      <div style={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: 'var(--bg-primary)',
        border: `2px solid ${event.accent}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        boxShadow: `0 0 15px ${event.accent}40`,
        flexShrink: 0,
      }}>
        <Icon size={20} style={{ color: event.accent }} />
      </div>

      {/* Content Card */}
      <div className="glass-panel" style={{ flex: 1, padding: 32, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {event.title}
          </h3>
          <span className="font-mono" style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: 20, color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            {event.year}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span className="badge font-mono" style={{ background: `${event.accent}15`, color: event.accent, border: `1px solid ${event.accent}30` }}>
            {event.type}
          </span>
        </div>

        <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
          {Array.isArray(event.description) ? (
            <ul style={{ paddingLeft: 20, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {event.description.map((bullet, i) => <li key={i}>{bullet}</li>)}
            </ul>
          ) : (
            <p>{event.description}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" style={{ padding: '120px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 56 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(139,92,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Cloud size={20} color="var(--accent-primary)" />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Experience & Achievements</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 600, lineHeight: 1.6, fontSize: '1rem' }}>
            A timeline of my professional experience, hackathons, and competitions.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: 12 }}>
          {events.map((event, i) => (
            <TimelineItem key={event.title} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
