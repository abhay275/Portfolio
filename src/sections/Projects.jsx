import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Shield, BarChart3, GraduationCap, Share2, ChevronRight } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';

const projects = [
  {
    title: 'Warden',
    description: 'Engineered a comprehensive security monitoring platform with real-time analytics and automated alert management, enabling SOC teams to accelerate incident response and threat mitigation.',
    tags: ['React', 'Node.js', 'Python', 'MongoDB', 'WebSocket', 'Tailwind CSS'],
    icon: Shield,
    accent: '#3B82F6',
    featured: true,
    status: 'Active',
    category: 'Cybersecurity',
    features: ['Threat Detection Engine', 'Real-time Incident Dashboard', 'Automated Alert Pipeline', 'Security Analytics & Reports', 'Interactive Threat Map'],
    github: 'https://github.com/abhay275',
    demo: '#',
  },
  {
    title: 'Log Analyzer Dashboard',
    description: 'Developed an intelligent log analysis engine utilizing Elasticsearch to ingest and parse server logs, detecting anomalies and surfacing actionable insights for infrastructure teams.',
    tags: ['Python', 'React', 'FastAPI', 'Elasticsearch', 'Chart.js'],
    icon: BarChart3,
    accent: '#06B6D4',
    featured: true,
    status: 'Active',
    category: 'Security Tools',
    features: ['Log Ingestion Pipeline', 'Pattern Detection', 'Anomaly Visualization', 'Custom Alert Rules'],
    github: 'https://github.com/abhay275',
    demo: '#',
  },
  {
    title: 'AVSAR',
    description: 'Architected a personalized career recommendation engine leveraging machine learning to map skills and academic backgrounds to optimal educational pathways.',
    tags: ['React', 'Python', 'Machine Learning', 'Firebase', 'Tailwind CSS'],
    icon: GraduationCap,
    accent: '#22C55E',
    featured: false,
    status: 'Active',
    category: 'AI / EdTech',
    features: ['Personalized Career Recommendations', 'Skill Gap Analysis', 'Education Path Mapping', 'Interactive Assessment'],
    github: 'https://github.com/abhay275/Personalized-Career-Advisor',
    demo: '#',
  },
  {
    title: 'ShareBox',
    description: 'Designed a secure file-sharing platform featuring drag-and-drop uploads, granular access controls, and encrypted link generation with a strict focus on data privacy.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Cloudinary'],
    icon: Share2,
    accent: '#F59E0B',
    featured: false,
    status: 'Active',
    category: 'Utility',
    features: ['Drag & Drop Upload', 'Shareable Links', 'Access Control', 'File Organization'],
    github: 'https://github.com/abhay275',
    demo: '#',
  },
];

function FlagshipCard({ project }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = project.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="card"
      style={{
        overflow: 'hidden',
        position: 'relative',
        marginBottom: 24,
      }}
    >
      {/* Top accent */}
      <div style={{
        height: 2,
        background: `linear-gradient(90deg, ${project.accent}, ${project.accent}40, transparent)`,
      }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 0,
      }}>
        {/* Left: Image placeholder / visual area */}
        <div style={{
          padding: '40px',
          background: `linear-gradient(135deg, ${project.accent}08, ${project.accent}03)`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderRight: '1px solid var(--border-default)',
          minHeight: 300,
        }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: `${project.accent}12`,
            border: `1px solid ${project.accent}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}>
            <Icon size={24} style={{ color: project.accent }} />
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 8,
          }}>
            <span className="badge font-mono" style={{
              background: `${project.accent}12`,
              color: project.accent,
              border: `1px solid ${project.accent}20`,
            }}>
              FLAGSHIP
            </span>
            <span className="badge font-mono" style={{
              background: 'rgba(34, 197, 94, 0.1)',
              color: 'var(--color-success)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
            }}>
              {project.status}
            </span>
          </div>

          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: 12,
            letterSpacing: '-0.02em',
          }}>
            {project.title}
          </h3>

          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            lineHeight: 1.8,
            marginBottom: 20,
          }}>
            {project.description}
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
              aria-label={`View ${project.title} source code on GitHub`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                textDecoration: 'none',
                padding: '8px 16px',
                fontSize: '0.82rem',
              }}
            >
              <Github size={14} />
              Source Code
            </a>
            <a
              href={project.demo}
              aria-label={`View ${project.title} live demo`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                borderRadius: 'var(--radius-md)',
                background: project.accent,
                color: 'white',
                textDecoration: 'none',
                fontSize: '0.82rem',
                fontWeight: 500,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = '0.9';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          </div>
        </div>

        {/* Right: Features + Tech */}
        <div style={{ padding: '40px' }}>
          <h4 style={{
            fontSize: '0.78rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: 20,
            fontFamily: 'var(--font-mono)',
          }}>
            Key Features
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
            {project.features.map(f => (
              <div key={f} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}>
                <ChevronRight size={14} style={{ color: project.accent, flexShrink: 0 }} />
                <span style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.88rem',
                }}>
                  {f}
                </span>
              </div>
            ))}
          </div>

          <h4 style={{
            fontSize: '0.78rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: 14,
            fontFamily: 'var(--font-mono)',
          }}>
            Tech Stack
          </h4>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {project.tags.map(tag => (
              <span
                key={tag}
                className="badge font-mono"
                style={{
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-default)',
                  padding: '4px 10px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div style={{ marginTop: 24 }}>
            <span className="font-mono" style={{
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              Category: {project.category}
            </span>
          </div>
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
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card card-interactive"
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Top accent line */}
      <div style={{
        height: 1,
        background: `linear-gradient(90deg, ${project.accent}, transparent)`,
      }} />

      <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: `${project.accent}10`,
            border: `1px solid ${project.accent}18`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Icon size={20} style={{ color: project.accent }} />
          </div>
          <div>
            <h3 style={{
              fontSize: '1.05rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: 2,
            }}>
              {project.title}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="font-mono" style={{
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
              }}>
                {project.category}
              </span>
              <span style={{
                width: 3,
                height: 3,
                borderRadius: '50%',
                background: 'var(--color-success)',
                display: 'inline-block',
              }} />
              <span className="font-mono" style={{
                fontSize: '0.68rem',
                color: 'var(--color-success)',
              }}>
                {project.status}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.85rem',
          lineHeight: 1.7,
          marginBottom: 16,
          flex: 1,
        }}>
          {project.description}
        </p>

        {/* Features */}
        <div style={{ marginBottom: 18 }}>
          {project.features.slice(0, 3).map(f => (
            <div key={f} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 6,
            }}>
              <ChevronRight size={12} style={{ color: project.accent, flexShrink: 0 }} />
              <span style={{
                color: 'var(--text-secondary)',
                fontSize: '0.8rem',
              }}>
                {f}
              </span>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 18 }}>
          {project.tags.map(tag => (
            <span
              key={tag}
              className="badge font-mono"
              style={{
                background: 'var(--bg-secondary)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-default)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${project.title} on GitHub`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '7px 14px',
              borderRadius: 8,
              background: 'transparent',
              border: '1px solid var(--border-default)',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.8rem',
              fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--border-hover)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-default)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            <Github size={14} />
            Code
          </a>
          <a
            href={project.demo}
            aria-label={`View ${project.title} live demo`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '7px 14px',
              borderRadius: 8,
              background: `${project.accent}12`,
              border: `1px solid ${project.accent}20`,
              color: project.accent,
              textDecoration: 'none',
              fontSize: '0.8rem',
              fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `${project.accent}20`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = `${project.accent}12`;
            }}
          >
            <ExternalLink size={14} />
            Demo
          </a>
        </div>
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
    <section id="projects" style={{ padding: '120px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <p className="section-tag" style={{ justifyContent: 'center', marginBottom: 14 }}>
            Featured Work
          </p>
          <h2 className="section-title" style={{ marginBottom: 18 }}>
            Projects that{' '}
            <span className="text-gradient">Ship</span>
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            maxWidth: 500,
            margin: '0 auto',
            lineHeight: 1.7,
            fontSize: '0.95rem',
          }}>
            From security monitoring platforms to intelligent career advisors — each project is
            crafted with precision and purpose.
          </p>
        </motion.div>

        {/* Flagship projects */}
        {flagshipProjects.map(project => (
          <FlagshipCard key={project.title} project={project} />
        ))}

        {/* Other projects grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 16,
          marginTop: 8,
        }}>
          {otherProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
