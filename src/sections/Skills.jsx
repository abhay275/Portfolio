import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Globe, Server, Database, Cloud, Shield, Wrench, Container, Monitor } from 'lucide-react';

const categories = [
  {
    title: 'Programming', icon: Code2, accent: '#3B82F6',
    skills: [{ name: 'Python', level: 90 }, { name: 'JavaScript', level: 85 }, { name: 'TypeScript', level: 70 }, { name: 'C/C++', level: 65 }]
  },
  {
    title: 'Frontend', icon: Globe, accent: '#06B6D4',
    skills: [{ name: 'React', level: 88 }, { name: 'Next.js', level: 70 }, { name: 'Tailwind CSS', level: 90 }, { name: 'Framer Motion', level: 75 }]
  },
  {
    title: 'Backend', icon: Server, accent: '#22C55E',
    skills: [{ name: 'Node.js', level: 82 }, { name: 'Express.js', level: 80 }, { name: 'FastAPI', level: 72 }, { name: 'GraphQL', level: 55 }]
  },
  {
    title: 'Database', icon: Database, accent: '#F59E0B',
    skills: [{ name: 'MongoDB', level: 80 }, { name: 'PostgreSQL', level: 65 }, { name: 'Firebase', level: 78 }, { name: 'Redis', level: 50 }]
  },
  {
    title: 'Cloud', icon: Cloud, accent: '#8B5CF6',
    skills: [{ name: 'AWS', level: 65 }, { name: 'Netlify', level: 85 }, { name: 'Vercel', level: 80 }, { name: 'Cloudflare', level: 60 }]
  },
  {
    title: 'Cybersecurity', icon: Shield, accent: '#EF4444',
    skills: [{ name: 'Network Security', level: 70 }, { name: 'Threat Detection', level: 68 }, { name: 'Vulnerability Assessment', level: 60 }, { name: 'Secure Coding', level: 72 }]
  },
  {
    title: 'DevOps & Tools', icon: Container, accent: '#06B6D4',
    skills: [{ name: 'Git / GitHub', level: 90 }, { name: 'Docker', level: 65 }, { name: 'Linux', level: 75 }, { name: 'CI/CD', level: 55 }]
  },
  {
    title: 'OS & Systems', icon: Monitor, accent: '#A1A1AA',
    skills: [{ name: 'Linux (Ubuntu/Kali)', level: 78 }, { name: 'Windows', level: 85 }, { name: 'macOS', level: 70 }, { name: 'Networking', level: 75 }]
  },
];

function SkillRing({ name, level, accent, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  
  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', width: 50, height: 50 }}>
        <svg width="50" height="50" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r={radius} stroke="var(--border-default)" strokeWidth="4" fill="none" />
          <motion.circle
            cx="25"
            cy="25"
            r={radius}
            stroke={accent}
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: circumference - (level / 100) * circumference } : {}}
            transition={{ duration: 1.5, delay: delay * 0.1, ease: 'easeOut' }}
            style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
          {level}%
        </div>
      </div>
      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center', fontWeight: 500 }}>{name}</span>
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
      className="glass-panel"
      style={{ padding: '24px', position: 'relative' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${category.accent}15` }}>
          <Icon size={18} style={{ color: category.accent }} />
        </div>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>{category.title}</h3>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {category.skills.map((skill, i) => (
          <SkillRing key={skill.name} name={skill.name} level={skill.level} accent={category.accent} delay={i} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" style={{ padding: '120px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 56 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Code2 size={20} color="var(--accent-primary)" />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Skill Matrix</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 500, lineHeight: 1.7, fontSize: '1rem' }}>
            A clustered overview of my technical capabilities.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {categories.map((cat, i) => (
            <CategoryCard key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
