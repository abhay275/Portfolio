import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Code2, Globe, Server, Database, Cloud, Shield,
  Wrench, Container, Monitor,
} from 'lucide-react';

const categories = [
  {
    title: 'Programming',
    icon: Code2,
    accent: '#3B82F6',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'TypeScript', level: 70 },
      { name: 'C/C++', level: 65 },
      { name: 'Java', level: 60 },
    ],
  },
  {
    title: 'Frontend',
    icon: Globe,
    accent: '#06B6D4',
    skills: [
      { name: 'React', level: 88 },
      { name: 'Next.js', level: 70 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'Framer Motion', level: 75 },
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    accent: '#22C55E',
    skills: [
      { name: 'Node.js', level: 82 },
      { name: 'Express.js', level: 80 },
      { name: 'FastAPI', level: 72 },
      { name: 'REST APIs', level: 85 },
      { name: 'GraphQL', level: 55 },
    ],
  },
  {
    title: 'Database',
    icon: Database,
    accent: '#F59E0B',
    skills: [
      { name: 'MongoDB', level: 80 },
      { name: 'PostgreSQL', level: 65 },
      { name: 'Firebase', level: 78 },
      { name: 'Redis', level: 50 },
    ],
  },
  {
    title: 'Cloud',
    icon: Cloud,
    accent: '#8B5CF6',
    skills: [
      { name: 'AWS', level: 65 },
      { name: 'Netlify', level: 85 },
      { name: 'Vercel', level: 80 },
      { name: 'Cloudflare', level: 60 },
    ],
  },
  {
    title: 'Cybersecurity',
    icon: Shield,
    accent: '#EF4444',
    skills: [
      { name: 'Network Security', level: 70 },
      { name: 'SIEM Tools', level: 65 },
      { name: 'Threat Detection', level: 68 },
      { name: 'Vulnerability Assessment', level: 60 },
      { name: 'Secure Coding', level: 72 },
    ],
  },
  {
    title: 'DevOps & Tools',
    icon: Container,
    accent: '#06B6D4',
    skills: [
      { name: 'Git / GitHub', level: 90 },
      { name: 'Docker', level: 65 },
      { name: 'Linux', level: 75 },
      { name: 'CI/CD', level: 55 },
    ],
  },
  {
    title: 'Operating Systems',
    icon: Monitor,
    accent: '#A1A1AA',
    skills: [
      { name: 'Linux (Ubuntu/Kali)', level: 78 },
      { name: 'Windows', level: 85 },
      { name: 'macOS', level: 70 },
    ],
  },
];

function SkillBar({ name, level, accent, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} style={{ marginBottom: 12 }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 5,
      }}>
        <span style={{
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
          fontWeight: 500,
        }}>
          {name}
        </span>
        <span className="font-mono" style={{
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
        }}>
          {level}%
        </span>
      </div>
      <div style={{
        height: 3,
        background: 'var(--border-default)',
        borderRadius: 2,
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 0.8, delay: delay * 0.05, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '100%',
            background: accent,
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
}

function CategoryCard({ category, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const Icon = category.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="card"
      style={{
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
      }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `${category.accent}10`,
          border: `1px solid ${category.accent}18`,
        }}>
          <Icon size={17} style={{ color: category.accent }} />
        </div>
        <h3 style={{
          fontSize: '0.92rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
        }}>
          {category.title}
        </h3>
      </div>

      {/* Skill bars */}
      {category.skills.map((skill, i) => (
        <SkillBar
          key={skill.name}
          name={skill.name}
          level={skill.level}
          accent={category.accent}
          delay={i}
        />
      ))}
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="skills"
      style={{
        padding: '120px 24px',
        background: 'var(--bg-secondary)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <p className="section-tag" style={{ justifyContent: 'center', marginBottom: 14 }}>
            Tech Arsenal
          </p>
          <h2 className="section-title" style={{ marginBottom: 18 }}>
            Tools & Technologies{' '}
            <span className="text-gradient">I Work With</span>
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            maxWidth: 500,
            margin: '0 auto',
            lineHeight: 1.7,
            fontSize: '0.95rem',
          }}>
            A comprehensive overview of the technologies and tools in my development toolkit.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}>
          {categories.map((cat, i) => (
            <CategoryCard key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
