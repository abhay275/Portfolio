import { motion } from 'framer-motion';
import { Briefcase, Code, Terminal, BookOpen, ExternalLink } from 'lucide-react';

const stats = [
  { label: 'Projects Completed', value: '24', icon: Briefcase, color: 'var(--accent-primary)' },
  { label: 'Open Source Commits', value: '500+', icon: Code, color: 'var(--color-success)' },
  { label: 'Hackathons Won', value: '3', icon: Terminal, color: 'var(--color-warning)' },
  { label: 'Hours Learned', value: '1.2k+', icon: BookOpen, color: 'var(--accent-secondary)' },
];

export default function Dashboard() {
  return (
    <section id="dashboard" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Terminal size={20} color="var(--accent-primary)" />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Command Center</h2>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginBottom: 40 }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card card-interactive"
              style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `rgba(255,255,255,0.05)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <stat.icon size={20} color={stat.color} />
                </div>
                <ExternalLink size={16} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Activity & Updates Split */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-panel"
            style={{ padding: 32 }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-success)', boxShadow: '0 0 10px var(--color-success)' }} />
              Live Activity
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { time: '2 hours ago', text: 'Merged PR #42 in open-source/security-tool', color: 'var(--accent-primary)' },
                { time: 'Yesterday', text: 'Deployed new version of portfolio to Vercel', color: 'var(--color-success)' },
                { time: '3 days ago', text: 'Completed Advanced React Patterns certification', color: 'var(--color-warning)' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: item.color }} />
                    {idx !== 2 && <div style={{ width: 2, height: 40, background: 'var(--border-default)' }} />}
                  </div>
                  <div style={{ marginTop: -4 }}>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: 4 }}>{item.text}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Current Focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-panel"
            style={{ padding: 32, display: 'flex', flexDirection: 'column' }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 24 }}>Current Focus</h3>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
              {[
                { title: 'Cloud Infrastructure', progress: 85, color: 'var(--accent-primary)' },
                { title: 'Zero Trust Architecture', progress: 60, color: 'var(--color-warning)' },
                { title: 'LLM Fine-tuning', progress: 40, color: 'var(--accent-secondary)' },
              ].map(item => (
                <div key={item.title}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{item.title}</span>
                    <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{item.progress}%</span>
                  </div>
                  <div style={{ width: '100%', height: 6, background: 'var(--bg-elevated)', borderRadius: 4, overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                      style={{ height: '100%', background: item.color, borderRadius: 4 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
