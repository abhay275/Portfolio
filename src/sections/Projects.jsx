import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Star, Zap } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';

const projects = [
  {
    title: 'NeuralVision AI',
    description: 'A real-time computer vision platform leveraging deep learning to detect and classify objects with 97% accuracy. Built with a Python FastAPI backend and React frontend.',
    tags: ['Python', 'TensorFlow', 'FastAPI', 'React', 'OpenCV'],
    color: '#00d4ff',
    gradient: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.1))',
    featured: true,
    stars: 128,
    emoji: '🧠',
    github: 'https://github.com',
    demo: '#',
  },
  {
    title: 'HackShield Security Suite',
    description: 'An automated penetration testing toolkit that scans web applications for common vulnerabilities (SQLi, XSS, CSRF) and generates detailed security reports.',
    tags: ['Python', 'Docker', 'React', 'Node.js', 'Linux'],
    color: '#39ff14',
    gradient: 'linear-gradient(135deg, rgba(57,255,20,0.12), rgba(6,255,165,0.08))',
    featured: false,
    stars: 84,
    emoji: '🔐',
    github: 'https://github.com',
    demo: '#',
  },
  {
    title: 'FlowBuilder SaaS',
    description: 'A no-code workflow automation platform inspired by Zapier. Users can create complex automations by connecting 50+ services with a drag-and-drop interface.',
    tags: ['React', 'Node.js', 'MongoDB', 'Firebase', 'Tailwind'],
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(255,0,110,0.08))',
    featured: true,
    stars: 210,
    emoji: '⚡',
    github: 'https://github.com',
    demo: '#',
  },
  {
    title: 'DeepChat LLM Interface',
    description: 'A beautiful, feature-rich chat interface for interacting with multiple LLMs (GPT-4, Claude, Gemini). Supports conversation history, custom system prompts, and export.',
    tags: ['React', 'TypeScript', 'TailwindCSS', 'OpenAI API', 'Firebase'],
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(255,0,110,0.08))',
    featured: false,
    stars: 340,
    emoji: '💬',
    github: 'https://github.com',
    demo: '#',
  },
  {
    title: 'StockSense ML Predictor',
    description: 'Time series forecasting model combining LSTM networks and sentiment analysis of financial news to predict stock trends with 72% directional accuracy.',
    tags: ['Python', 'TensorFlow', 'Pandas', 'FastAPI', 'React'],
    color: '#06ffa5',
    gradient: 'linear-gradient(135deg, rgba(6,255,165,0.12), rgba(0,212,255,0.08))',
    featured: true,
    stars: 156,
    emoji: '📈',
    github: 'https://github.com',
    demo: '#',
  },
  {
    title: 'DevCollab Platform',
    description: 'A real-time collaborative coding environment with live code execution, video chat, and AI-powered code suggestions. Perfect for pair programming sessions.',
    tags: ['React', 'WebRTC', 'Node.js', 'Socket.io', 'Docker'],
    color: '#ff006e',
    gradient: 'linear-gradient(135deg, rgba(255,0,110,0.12), rgba(124,58,237,0.08))',
    featured: false,
    stars: 98,
    emoji: '🤝',
    github: 'https://github.com',
    demo: '#',
  },
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 150 }}
      className="project-card"
      style={{
        background: project.gradient,
        border: `1px solid ${project.color}25`,
        borderRadius: 20,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.4s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${project.color}60`;
        e.currentTarget.style.boxShadow = `0 0 40px ${project.color}20, 0 20px 60px rgba(0,0,0,0.4)`;
        e.currentTarget.style.transform = 'translateY(-8px) rotateX(2deg)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `${project.color}25`;
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0) rotateX(0)';
      }}
    >
      {/* Top accent line */}
      <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }} />

      {/* Featured badge */}
      {project.featured && (
        <div style={{
          position: 'absolute',
          top: 16,
          right: 16,
          background: `${project.color}20`,
          border: `1px solid ${project.color}40`,
          borderRadius: 20,
          padding: '3px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}>
          <Star size={10} style={{ color: project.color }} />
          <span className="font-mono" style={{ fontSize: '0.65rem', color: project.color }}>FEATURED</span>
        </div>
      )}

      <div style={{ padding: '28px' }}>
        {/* Emoji & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
          <div style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: `${project.color}15`,
            border: `1px solid ${project.color}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.6rem',
            flexShrink: 0,
          }}>
            {project.emoji}
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 2 }}>
              {project.title}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Star size={12} style={{ color: '#f59e0b' }} />
              <span className="font-mono" style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{project.stars}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: 20 }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
          {project.tags.map(tag => (
            <span
              key={tag}
              className="badge font-mono"
              style={{
                background: `${project.color}10`,
                color: project.color,
                border: `1px solid ${project.color}25`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            data-hover="true"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              borderRadius: 8,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#94a3b8',
              textDecoration: 'none',
              fontSize: '0.8rem',
              fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#ffffff30'; e.currentTarget.style.color = '#ffffff'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#94a3b8'; }}
          >
            <Github size={14} />
            Code
          </a>
          <a
            href={project.demo}
            data-hover="true"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              borderRadius: 8,
              background: `${project.color}15`,
              border: `1px solid ${project.color}30`,
              color: project.color,
              textDecoration: 'none',
              fontSize: '0.8rem',
              fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${project.color}25`; }}
            onMouseLeave={e => { e.currentTarget.style.background = `${project.color}15`; }}
          >
            <ExternalLink size={14} />
            Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <p className="section-tag" style={{ justifyContent: 'center', marginBottom: 16 }}>Featured Work</p>
          <h2 className="section-title" style={{ marginBottom: 20 }}>
            <span style={{ color: '#e2e8f0' }}>Projects that </span>
            <span className="text-gradient">Ship</span>
          </h2>
          <p style={{ color: '#64748b', maxWidth: 500, margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
            From AI-powered tools to full-stack SaaS platforms — every project is crafted with precision and purpose.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 24,
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
