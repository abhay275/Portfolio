import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Globe, Server, Database, Cloud, Shield, Wrench, Container, Monitor } from 'lucide-react';

const categories = [
  {
    title: 'DevOps & Deployment', icon: Container, accent: '#06B6D4',
    skills: [{ name: 'Docker', level: 75 }, { name: 'CI/CD', level: 70 }, { name: 'App Deployment', level: 80 }, { name: 'Monitoring', level: 65 }]
  },
  {
    title: 'Cloud & Infrastructure', icon: Cloud, accent: '#8B5CF6',
    skills: [{ name: 'Cloud Fundamentals', level: 75 }, { name: 'Workflows', level: 70 }, { name: 'Backend Services', level: 80 }, { name: 'REST APIs', level: 85 }]
  },
  {
    title: 'Programming', icon: Code2, accent: '#3B82F6',
    skills: [{ name: 'Python', level: 90 }, { name: 'JavaScript', level: 85 }, { name: 'SQL', level: 75 }, { name: 'Dart / Kotlin', level: 65 }]
  },
  {
    title: 'Backend & Frameworks', icon: Server, accent: '#22C55E',
    skills: [{ name: 'FastAPI', level: 80 }, { name: 'Node.js', level: 82 }, { name: 'React.js', level: 88 }, { name: 'Flutter', level: 75 }]
  },
  {
    title: 'Databases', icon: Database, accent: '#F59E0B',
    skills: [{ name: 'PostgreSQL', level: 75 }, { name: 'MongoDB', level: 80 }, { name: 'Firebase', level: 78 }, { name: 'Redis', level: 60 }]
  },
  {
    title: 'Developer Tools', icon: Wrench, accent: '#A1A1AA',
    skills: [{ name: 'Git / GitHub', level: 90 }, { name: 'VS Code', level: 95 }, { name: 'Android Studio', level: 70 }, { name: 'Visual Studio', level: 75 }]
  },
  {
    title: 'Testing & Engineering', icon: Shield, accent: '#EF4444',
    skills: [{ name: 'API Testing', level: 85 }, { name: 'Debugging', level: 80 }, { name: 'Manual Testing', level: 75 }, { name: 'App Monitoring', level: 70 }]
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
