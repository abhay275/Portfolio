import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Flame, Code2, Star, GitFork, TrendingUp, Activity } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';

function useCountUp(target, duration = 1500, isInView = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);
  return count;
}

const statCards = [
  { label: 'GitHub Commits', value: 512, suffix: '+', icon: Github, accent: '#3B82F6' },
  { label: 'LeetCode Solved', value: 600, suffix: '+', icon: Code2, accent: '#F59E0B' },
  { label: 'Day Streak', value: 47, suffix: '', icon: Flame, accent: '#EF4444' },
  { label: 'Repositories', value: 38, suffix: '+', icon: GitFork, accent: '#8B5CF6' },
  { label: 'Stars Earned', value: 1016, suffix: '+', icon: Star, accent: '#EAB308' },
  { label: 'Problems / Month', value: 45, suffix: ' avg', icon: TrendingUp, accent: '#22C55E' },
];

function ContributionGraph() {
  const weeks = 26;
  const days = 7;
  const cells = Array.from({ length: weeks * days }, () => {
    const rand = Math.random();
    return rand < 0.35 ? 0 : rand < 0.55 ? 1 : rand < 0.75 ? 2 : rand < 0.9 ? 3 : 4;
  });

  const colors = [
    'rgba(59, 130, 246, 0.05)',
    'rgba(59, 130, 246, 0.2)',
    'rgba(59, 130, 246, 0.4)',
    'rgba(59, 130, 246, 0.7)',
    'rgba(59, 130, 246, 1)',
  ];

  return (
    <div style={{ overflowX: 'auto', paddingBottom: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${weeks}, 12px)`, gridTemplateRows: `repeat(${days}, 12px)`, gap: 4, width: 'max-content' }}>
        {cells.map((level, i) => (
          <motion.div
            key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2, delay: (i % weeks) * 0.01 }}
            title={`Level ${level}`}
            style={{ width: 12, height: 12, borderRadius: 3, background: colors[level], border: '1px solid rgba(255,255,255,0.05)', cursor: 'default' }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 16 }}>
        <span className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Less</span>
        {colors.map((c, i) => (
          <div key={i} style={{ width: 12, height: 12, borderRadius: 3, background: c, border: '1px solid rgba(255,255,255,0.05)' }} />
        ))}
        <span className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>More</span>
      </div>
    </div>
  );
}

function LeetCodeStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const difficulties = [
    { label: 'Easy', solved: 280, total: 350, accent: '#22C55E' },
    { label: 'Medium', solved: 250, total: 400, accent: '#F59E0B' },
    { label: 'Hard', solved: 70, total: 200, accent: '#EF4444' },
  ];

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {difficulties.map(d => (
        <div key={d.label}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span className="font-mono" style={{ color: d.accent, fontSize: '0.8rem', fontWeight: 500 }}>{d.label}</span>
            <span className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{d.solved} / {d.total}</span>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }} animate={isInView ? { width: `${(d.solved / d.total) * 100}%` } : {}} transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
              style={{ height: '100%', background: d.accent, borderRadius: 3 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function StatCard({ stat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const count = useCountUp(stat.value, 1200, isInView);
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref} initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass-card" style={{ padding: '24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 2, background: `linear-gradient(90deg, transparent, ${stat.accent}50, transparent)` }} />
      <div style={{ width: 44, height: 44, borderRadius: 12, background: `${stat.accent}15`, border: `1px solid ${stat.accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: `0 0 15px ${stat.accent}20` }}>
        <Icon size={20} style={{ color: stat.accent }} />
      </div>
      <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>
        {count}{stat.suffix}
      </div>
      <div className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="stats" style={{ padding: '120px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          ref={ref} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={20} color="var(--accent-primary)" />
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>Coding Analytics</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7, fontSize: '1.05rem' }}>
            Quantifiable metrics reflecting continuous development, code reviews, and technical problem-solving.
          </p>
        </motion.div>

        {/* Stat counters */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 20, marginBottom: 48 }}>
          {statCards.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
        </div>

        {/* Contribution graph + LeetCode */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 24 }}>
          {/* GitHub Graph */}
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <Github size={20} style={{ color: 'var(--text-primary)' }} />
              <span style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)' }}>Contribution Graph</span>
            </div>
            <ContributionGraph />
          </div>

          {/* LeetCode */}
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <Code2 size={20} style={{ color: '#F59E0B' }} />
              <span style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)' }}>LeetCode Progress</span>
              <span className="badge font-mono" style={{ marginLeft: 'auto', background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                Knight
              </span>
            </div>
            <div style={{ display: 'flex', gap: 40, alignItems: 'center', marginBottom: 32 }}>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>600+</div>
                <div className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 8 }}>Problems Solved</div>
              </div>
            </div>
            <LeetCodeStats />
          </div>
        </div>
      </div>
    </section>
  );
}
