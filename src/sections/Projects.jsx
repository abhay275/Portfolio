import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Shield, BarChart3, GraduationCap, Share2, ChevronRight, CheckCircle2, Code } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';

const projects = [
  {
    title: 'Warden',
    description: 'Engineered a comprehensive security monitoring platform with real-time analytics and automated alert management, enabling SOC teams to accelerate incident response and threat mitigation.',
    tags: ['React', 'Node.js', 'Python', 'MongoDB', 'WebSocket'],
    icon: Shield,
    accent: '#3B82F6',
    featured: true,
    status: 'Production',
    category: 'Cybersecurity',
    features: ['Threat Detection Engine', 'Real-time Dashboard', 'Automated Pipeline', 'Interactive Map'],
    github: 'https://github.com/abhay275',
    demo: '#',
  },
  {
    title: 'Log Analyzer',
    description: 'Developed an intelligent log analysis engine utilizing Elasticsearch to ingest and parse server logs, detecting anomalies and surfacing actionable insights.',
    tags: ['Python', 'React', 'FastAPI', 'Elasticsearch'],
    icon: BarChart3,
    accent: '#06B6D4',
    featured: true,
    status: 'Beta',
    category: 'Security Tools',
    features: ['Log Ingestion Pipeline', 'Pattern Detection', 'Anomaly Visuals', 'Custom Rules'],
    github: 'https://github.com/abhay275',
    demo: '#',
  },
  {
    title: 'AVSAR',
    description: 'Architected a personalized career recommendation engine leveraging machine learning to map skills and academic backgrounds to optimal educational pathways.',
    tags: ['React', 'Python', 'ML', 'Firebase'],
    icon: GraduationCap,
    accent: '#22C55E',
    featured: false,
    status: 'Live',
    category: 'AI / EdTech',
    features: ['Personalized Advice', 'Skill Gap Analysis', 'Path Mapping'],
    github: 'https://github.com/abhay275/Personalized-Career-Advisor',
    demo: 'https://collaborate-create-code.vercel.app/',
  },
  {
    title: 'ShareBox',
    description: 'Designed a secure file-sharing platform featuring drag-and-drop uploads, granular access controls, and encrypted link generation.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    icon: Share2,
    accent: '#F59E0B',
    featured: false,
    status: 'Live',
    category: 'Utility',
    features: ['Drag & Drop', 'Shareable Links', 'Access Control'],
    github: 'https://github.com/abhay275',
    demo: '#',
  },
];

function FlagshipCard({ project, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = project.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-card"
      style={{
        overflow: 'hidden',
        position: 'relative',
        marginBottom: 32,
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: 0,
      }}
    >
      <div style={{ padding: 40, borderRight: '1px solid var(--border-default)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: `${project.accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 20px ${project.accent}20` }}>
            <Icon size={24} style={{ color: project.accent }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span className="badge font-mono" style={{ background: `${project.accent}15`, color: project.accent, border: `1px solid ${project.accent}30` }}>
                FLAGSHIP
              </span>
              <span className="badge font-mono" style={{ background: 'rgba(34, 197, 94, 0.1)', color: 'var(--color-success)', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                {project.status}
              </span>
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              {project.title}
            </h3>
          </div>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: 32 }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', background: project.accent }}>
            <ExternalLink size={16} />
            Live Deployment
          </a>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <Github size={16} />
            Source Code
          </a>
        </div>
      </div>

      <div style={{ padding: 40, background: 'rgba(255,255,255,0.01)' }}>
        <h4 style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 24, fontFamily: 'var(--font-mono)' }}>
          Capabilities
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
          {project.features.map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <CheckCircle2 size={16} style={{ color: project.accent }} />
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{f}</span>
            </div>
          ))}
        </div>

        <h4 style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          Infrastructure
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {project.tags.map(tag => (
            <span key={tag} className="badge font-mono" style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border-default)', padding: '6px 12px' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const Icon = project.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card card-interactive"
      style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: 32 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${project.accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={20} style={{ color: project.accent }} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{project.title}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{project.category}</span>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-success)' }} />
            <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-success)' }}>{project.status}</span>
          </div>
        </div>
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 24, flex: 1 }}>
        {project.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        {project.tags.map(tag => (
          <span key={tag} className="badge font-mono" style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-muted)', border: '1px solid var(--border-default)' }}>
            {tag}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, flex: 1, textDecoration: 'none', padding: '10px', fontSize: '0.85rem' }}>
          <ExternalLink size={14} /> View
        </a>
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, flex: 1, textDecoration: 'none', padding: '10px', fontSize: '0.85rem' }}>
          <Github size={14} /> Code
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const flagshipProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" style={{ padding: '120px 24px', position: 'relative' }}>
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
              <Code size={20} color="var(--accent-primary)" />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Production Deployments</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 600, lineHeight: 1.6, fontSize: '1rem' }}>
            Enterprise-grade applications architected for scalability, security, and performance.
          </p>
        </motion.div>

        {/* Flagship projects */}
        <div>
          {flagshipProjects.map((project, idx) => (
            <FlagshipCard key={project.title} project={project} index={idx} />
          ))}
        </div>

        {/* Other projects grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: 24, marginTop: 8 }}>
          {otherProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .glass-card {
            grid-template-columns: 1fr !important;
          }
          .glass-card > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid var(--border-default) !important;
          }
        }
      `}</style>
    </section>
  );
}
