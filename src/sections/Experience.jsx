import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Code2, Trophy, BookOpen, Star, GitBranch } from 'lucide-react';

const events = [
  {
    year: '2024',
    title: 'Built NeuralVision AI Platform',
    description: 'Developed a production-ready computer vision SaaS using TensorFlow, FastAPI, and React. Achieved 97% classification accuracy.',
    icon: Code2,
    color: '#00d4ff',
    type: 'AI/ML Project',
  },
  {
    year: '2024',
    title: 'National Hackathon — Top 5',
    description: 'Competed in a 48-hour national hackathon with 800+ participants. Built a real-time disaster response coordination platform.',
    icon: Trophy,
    color: '#f59e0b',
    type: 'Hackathon',
  },
  {
    year: '2023',
    title: 'AWS Cloud Practitioner Certified',
    description: 'Earned AWS certification with a focus on cloud architecture, security, and deploying scalable serverless applications.',
    icon: Award,
    color: '#7c3aed',
    type: 'Certification',
  },
  {
    year: '2023',
    title: 'Open Source: 500+ GitHub Contributions',
    description: 'Contributed to major OSS projects including React libraries, Python ML toolkits, and documentation improvements.',
    icon: GitBranch,
    color: '#39ff14',
    type: 'Open Source',
  },
  {
    year: '2023',
    title: 'Top 5% on LeetCode',
    description: 'Solved 600+ algorithmic challenges, achieving Knight rank and consistently ranking in the top 5% globally.',
    icon: Star,
    color: '#ff006e',
    type: 'Competitive Coding',
  },
  {
    year: '2022',
    title: 'Started B.Tech in Computer Science',
    description: 'Enrolled in CS program specializing in AI/ML. Maintaining high academic performance while building real-world projects.',
    icon: BookOpen,
    color: '#06ffa5',
    type: 'Education',
  },
];

function TimelineItem({ event, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const Icon = event.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        display: 'flex',
        gap: 24,
        paddingLeft: 52,
        position: 'relative',
        paddingBottom: index < events.length - 1 ? 40 : 0,
      }}
    >
      {/* Timeline dot */}
      <div style={{
        position: 'absolute',
        left: 14,
        top: 4,
        width: 14,
        height: 14,
        borderRadius: '50%',
        background: event.color,
        boxShadow: `0 0 15px ${event.color}, 0 0 30px ${event.color}60`,
        zIndex: 1,
        flexShrink: 0,
      }} />

      {/* Card */}
      <div
        className="glass-card"
        style={{
          borderRadius: 16,
          padding: '22px',
          flex: 1,
          borderLeft: `2px solid ${event.color}40`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, flexWrap: 'wrap' }}>
          <div style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            background: `${event.color}15`,
            border: `1px solid ${event.color}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Icon size={18} style={{ color: event.color }} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
              <span
                className="badge font-mono"
                style={{
                  background: `${event.color}10`,
                  color: event.color,
                  border: `1px solid ${event.color}25`,
                }}
              >
                {event.type}
              </span>
              <span className="font-mono" style={{ color: '#475569', fontSize: '0.72rem' }}>
                {event.year}
              </span>
            </div>

            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 8 }}>
              {event.title}
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.7 }}>
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
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" style={{ padding: '100px 24px', background: 'rgba(6,13,26,0.4)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <p className="section-tag" style={{ justifyContent: 'center', marginBottom: 16 }}>Journey</p>
          <h2 className="section-title" style={{ marginBottom: 20 }}>
            <span style={{ color: '#e2e8f0' }}>Experience & </span>
            <span className="text-gradient">Achievements</span>
          </h2>
          <p style={{ color: '#64748b', maxWidth: 480, margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Key milestones in my developer journey — built with code, learned through failure, shipped with purpose.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div className="timeline-line" />

          {events.map((event, i) => (
            <TimelineItem key={event.title} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
