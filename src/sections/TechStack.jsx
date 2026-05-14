import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TechCloud from '../components/3d/TechCloud';

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="tech" style={{ padding: '100px 24px', background: 'rgba(6,13,26,0.5)', position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(0,212,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.02) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 40 }}
        >
          <p className="section-tag" style={{ justifyContent: 'center', marginBottom: 16 }}>Tech Arsenal</p>
          <h2 className="section-title" style={{ marginBottom: 20 }}>
            <span className="text-gradient">3D Tools</span>
            <span style={{ color: '#e2e8f0' }}> I Build With</span>
          </h2>
          <p style={{ color: '#64748b', maxWidth: 500, margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Interact with the 3D cloud below! These are the technologies I use to build intelligent, scalable, and beautiful products.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TechCloud />
        </motion.div>
      </div>
    </section>
  );
}
