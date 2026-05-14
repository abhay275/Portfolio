import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Flame, Code2, Star, GitFork, TrendingUp } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';

function useCountUp(target, duration = 1800, isInView = false) {
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
  { label: 'GitHub Commits', value: 512, suffix: '+', icon: Github, color: '#f0f0f0', bg: 'rgba(240,240,240,0.08)' },
  { label: 'LeetCode Solved', value: 600, suffix: '+', icon: Code2, color: '#ffa500', bg: 'rgba(255,165,0,0.08)' },
  { label: 'Day Streak', value: 47, suffix: ' 🔥', icon: Flame, color: '#ff6b35', bg: 'rgba(255,107,53,0.1)' },
  { label: 'Repos', value: 38, suffix: '+', icon: GitFork, color: '#00d4ff', bg: 'rgba(0,212,255,0.08)' },
  { label: 'Stars Earned', value: 1016, suffix: '+', icon: Star, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
  { label: 'Problems / Month', value: 45, suffix: ' avg', icon: TrendingUp, color: '#06ffa5', bg: 'rgba(6,255,165,0.08)' },
];

// Fake GitHub contribution graph
function ContributionGraph() {
  const weeks = 26;
  const days = 7;
  const cells = Array.from({ length: weeks * days }, (_, i) => {
    const rand = Math.random();
    const level = rand < 0.35 ? 0 : rand < 0.55 ? 1 : rand < 0.75 ? 2 : rand < 0.9 ? 3 : 4;
    return level;
  });

  const colors = [
    'rgba(0,212,255,0.06)',
    'rgba(0,212,255,0.2)',
    'rgba(0,212,255,0.4)',
    'rgba(0,212,255,0.65)',
    'rgba(0,212,255,0.9)',
  ];

  return (
    <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${weeks}, 14px)`,
        gridTemplateRows: `repeat(${days}, 14px)`,
        gap: 3,
        width: 'max-content',
      }}>
        {cells.map((level, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: (i % weeks) * 0.01 }}
            title={`Level ${level}`}
            style={{
              width: 14,
              height: 14,
              borderRadius: 3,
              background: colors[level],
              border: level > 0 ? `1px solid ${colors[level].replace(')', ', 0.5)').replace('rgba', 'rgba')}` : '1px solid rgba(255,255,255,0.04)',
              cursor: 'pointer',
              transition: 'transform 0.15s',
              boxShadow: level === 4 ? '0 0 6px rgba(0,212,255,0.5)' : 'none',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.4)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 10 }}>
        <span className="font-mono" style={{ color: '#475569', fontSize: '0.65rem' }}>Less</span>
        {colors.map((c, i) => (
          <div key={i} style={{ width: 12, height: 12, borderRadius: 2, background: c }} />
        ))}
        <span className="font-mono" style={{ color: '#475569', fontSize: '0.65rem' }}>More</span>
      </div>
    </div>
  );
}

// LeetCode difficulty bars
function LeetCodeStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const difficulties = [
    { label: 'Easy', solved: 280, total: 350, color: '#39ff14' },
    { label: 'Medium', solved: 250, total: 400, color: '#f59e0b' },
    { label: 'Hard', solved: 70, total: 200, color: '#ff006e' },
  ];

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {difficulties.map(d => (
        <div key={d.label}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span className="font-mono" style={{ color: d.color, fontSize: '0.78rem' }}>{d.label}</span>
            <span className="font-mono" style={{ color: '#64748b', fontSize: '0.78rem' }}>{d.solved}/{d.total}</span>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${(d.solved / d.total) * 100}%` } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              style={{
                height: '100%',
                background: `linear-gradient(90deg, ${d.color}90, ${d.color})`,
                borderRadius: 4,
                boxShadow: `0 0 8px ${d.color}60`,
              }}
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
  const count = useCountUp(stat.value, 1500, isInView);
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card"
      style={{
        borderRadius: 16,
        padding: '24px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        background: stat.bg,
        border: `1px solid ${stat.color}20`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 14px',
      }}>
        <Icon size={20} style={{ color: stat.color }} />
      </div>
      <div style={{
        fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
        fontWeight: 800,
        color: stat.color,
        letterSpacing: '-0.02em',
        textShadow: `0 0 20px ${stat.color}60`,
        marginBottom: 4,
      }}>
        {count}{stat.suffix}
      </div>
      <div className="font-mono" style={{ color: '#475569', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="stats" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <p className="section-tag" style={{ justifyContent: 'center', marginBottom: 16 }}>Coding Activity</p>
          <h2 className="section-title" style={{ marginBottom: 20 }}>
            <span style={{ color: '#e2e8f0' }}>GitHub & </span>
            <span className="text-gradient">Coding Stats</span>
          </h2>
          <p style={{ color: '#64748b', maxWidth: 480, margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Numbers don't lie — consistently coding, learning, and shipping every single day.
          </p>
        </motion.div>

        {/* Stat counters */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
          gap: 16,
          marginBottom: 48,
        }}>
          {statCards.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
        </div>

        {/* Contribution graph + LeetCode */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: 24,
        }}>
          {/* GitHub Graph */}
          <div className="glass-card" style={{ borderRadius: 16, padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <Github size={18} style={{ color: '#f0f0f0' }} />
              <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#e2e8f0' }}>
                GitHub Contribution Graph
              </span>
            </div>
            <ContributionGraph />
          </div>

          {/* LeetCode */}
          <div className="glass-card" style={{ borderRadius: 16, padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <Code2 size={18} style={{ color: '#ffa500' }} />
              <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#e2e8f0' }}>
                LeetCode Progress
              </span>
              <span
                className="badge font-mono"
                style={{ marginLeft: 'auto', background: 'rgba(255,165,0,0.1)', color: '#ffa500', border: '1px solid rgba(255,165,0,0.2)' }}
              >
                Knight 🏆
              </span>
            </div>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffa500', textShadow: '0 0 20px rgba(255,165,0,0.5)' }}>
                600+
              </div>
              <div className="font-mono" style={{ color: '#475569', fontSize: '0.72rem' }}>PROBLEMS SOLVED</div>
            </div>
            <LeetCodeStats />
          </div>
        </div>
      </div>
    </section>
  );
}
