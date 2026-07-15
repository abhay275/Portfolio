import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ExternalLink, Calendar } from 'lucide-react';

const certifications = [
  {
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2023',
    description: 'Validated expertise in cloud architecture, IAM access management, and securing core AWS services.',
    accent: '#F59E0B',
    verifyUrl: '#',
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: '2024',
    description: 'Mastered foundational security operations, threat modeling, and network defense strategies.',
    accent: '#3B82F6',
    verifyUrl: '#',
  },
  {
    title: 'Python for Data Science',
    issuer: 'IBM',
    date: '2023',
    description: 'Demonstrated proficiency in data analysis, visualization, and applying machine learning algorithms in Python.',
    accent: '#06B6D4',
    verifyUrl: '#',
  },
];

function CertCard({ cert, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card card-interactive"
      style={{
        padding: '24px',
        display: 'flex',
        gap: 18,
        alignItems: 'flex-start',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Accent line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 3,
        height: '100%',
        background: cert.accent,
        borderRadius: '0 2px 2px 0',
      }} />

      {/* Icon */}
      <div style={{
        width: 44,
        height: 44,
        borderRadius: 10,
        background: `${cert.accent}10`,
        border: `1px solid ${cert.accent}18`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Award size={20} style={{ color: cert.accent }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 8,
          marginBottom: 6,
        }}>
          <h3 style={{
            fontSize: '0.95rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
          }}>
            {cert.title}
          </h3>
          {cert.verifyUrl && cert.verifyUrl !== '#' && (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Verify ${cert.title} certification`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                color: cert.accent,
                fontSize: '0.75rem',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              Verify <ExternalLink size={11} />
            </a>
          )}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 8,
        }}>
          <span style={{
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
            fontWeight: 500,
          }}>
            {cert.issuer}
          </span>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            color: 'var(--text-muted)',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
          }}>
            <Calendar size={11} />
            {cert.date}
          </span>
        </div>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.82rem',
          lineHeight: 1.7,
        }}>
          {cert.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="certifications" style={{ padding: '120px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <p className="section-tag" style={{ justifyContent: 'center', marginBottom: 14 }}>
            Credentials
          </p>
          <h2 className="section-title" style={{ marginBottom: 18 }}>
            Certifications &{' '}
            <span className="text-gradient">Credentials</span>
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            maxWidth: 460,
            margin: '0 auto',
            lineHeight: 1.7,
            fontSize: '0.95rem',
          }}>
            Professional certifications that validate my technical competencies.
          </p>
        </motion.div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}>
          {certifications.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
