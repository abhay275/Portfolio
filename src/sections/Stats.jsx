import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Flame, Code2, Star, GitFork, TrendingUp } from 'lucide-react';
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
  { label: 'GitHub Commits', value: 512, suffix: '+', icon: Github, accent: '#F8FAFC' },
  { label: 'LeetCode Solved', value: 600, suffix: '+', icon: Code2, accent: '#F59E0B' },
  { label: 'Day Streak', value: 47, suffix: '', icon: Flame, accent: '#EF4444' },
  { label: 'Repositories', value: 38, suffix: '+', icon: GitFork, accent: '#3B82F6' },
  { label: 'Stars Earned', value: 1016, suffix: '+', icon: Star, accent: '#F59E0B' },
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
    'rgba(59, 130, 246, 0.15)',
    'rgba(59, 130, 246, 0.3)',
    'rgba(59, 130, 246, 0.5)',
    'rgba(59, 130, 246, 0.75)',
  ];

  return (
    <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${weeks}, 13px)`,
        gridTemplateRows: `repeat(${days}, 13px)`,
        gap: 3,
        width: 'max-content',
      }}>
        {cells.map((level, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: (i % weeks) * 0.01 }}
            title={`Level ${level}`}
            style={{
              width: 13,
              height: 13,
              borderRadius: 2,
              background: colors[level],
              border: '1px solid var(--border-default)',
              cursor: 'default',
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginTop: 10 }}>
        <span className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>Less</span>
        {colors.map((c, i) => (
          <div key={i} style={{ width: 11, height: 11, borderRadius: 2, background: c, border: '1px solid var(--border-default)' }} />
        ))}
        <span className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>More</span>
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
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {difficulties.map(d => (
        <div key={d.label}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span className="font-mono" style={{ color: d.accent, fontSize: '0.75rem' }}>{d.label}</span>
            <span className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{d.solved}/{d.total}</span>
          </div>
          <div style={{ height: 4, background: 'var(--border-default)', borderRadius: 2, overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${(d.solved / d.total) * 100}%` } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: '100%',
                background: d.accent,
                borderRadius: 2,
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
  const count = useCountUp(stat.value, 1200, isInView);
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="card"
      style={{
        padding: '20px 16px',
        textAlign: 'center',
      }}
    >
      <div style={{
        width: 38,
        height: 38,
        borderRadius: 9,
        background: `${stat.accent}10`,
        border: `1px solid ${stat.accent}15`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 12px',
      }}>
        <Icon size={17} style={{ color: stat.accent }} />
      </div>
      <div style={{
        fontSize: 'clamp(1.4rem, 3.5vw, 1.8rem)',
        fontWeight: 700,
        color: 'var(--text-primary)',
        letterSpacing: '-0.02em',
        marginBottom: 4,
      }}>
        {count}{stat.suffix}
      </div>
      <div className="font-mono" style={{
        color: 'var(--text-muted)',
        fontSize: '0.68rem',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="stats" style={{ padding: '120px 24px', background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <p className="section-tag" style={{ justifyContent: 'center', marginBottom: 14 }}>
            Coding Activity
          </p>
          <h2 className="section-title" style={{ marginBottom: 18 }}>
            GitHub &{' '}
            <span className="text-gradient">Coding Stats</span>
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            maxWidth: 480,
            margin: '0 auto',
            lineHeight: 1.7,
            fontSize: '0.95rem',
          }}>
            Quantifiable metrics reflecting continuous development, code reviews, and technical problem-solving.
          </p>
        </motion.div>

        {/* Stat counters */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 12,
          marginBottom: 40,
        }}>
          {statCards.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
        </div>

        {/* Contribution graph + LeetCode */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 16,
        }}>
          {/* GitHub Graph */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <Github size={16} style={{ color: 'var(--text-primary)' }} />
              <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                Contribution Graph
              </span>
            </div>
            <ContributionGraph />
          </div>

          {/* LeetCode */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <Code2 size={16} style={{ color: '#F59E0B' }} />
              <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                LeetCode Progress
              </span>
              <span
                className="badge font-mono"
                style={{
                  marginLeft: 'auto',
                  background: 'rgba(245, 158, 11, 0.1)',
                  color: '#F59E0B',
                  border: '1px solid rgba(245, 158, 11, 0.18)',
                }}
              >
                Knight
              </span>
            </div>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                600+
              </div>
              <div className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Problems Solved
              </div>
            </div>
            <LeetCodeStats />
          </div>
        </div>
      </div>
    </section>
  );
}
