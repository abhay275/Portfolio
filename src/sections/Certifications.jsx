import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ExternalLink, Calendar, CheckCircle } from 'lucide-react';

const certifications = [
  {
    title: 'AWS Certified Cloud Practitioner',
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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card card-interactive"
      style={{ padding: 32, position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: `${cert.accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 0 20px ${cert.accent}20` }}>
          <Award size={28} style={{ color: cert.accent }} />
        </div>
        
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 8, flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>{cert.title}</h3>
            {cert.verifyUrl !== '#' && (
              <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, color: cert.accent, fontSize: '0.8rem', textDecoration: 'none', fontWeight: 500, padding: '4px 12px', background: `${cert.accent}10`, borderRadius: 20 }}>
                Verify <ExternalLink size={14} />
              </a>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <CheckCircle size={14} color="var(--color-success)" />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{cert.issuer}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)' }}>
              <Calendar size={14} />
              <span className="font-mono" style={{ fontSize: '0.8rem' }}>{cert.date}</span>
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{cert.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="certifications" style={{ padding: '120px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 56 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={20} color="var(--accent-primary)" />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Verified Credentials</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 600, lineHeight: 1.6, fontSize: '1rem' }}>
            Professional certifications and validations of technical expertise.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
          {certifications.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
