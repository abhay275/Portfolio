import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, BarChart, Bar
} from 'recharts';

const radarData = [
  { subject: 'Frontend', A: 90, fullMark: 100 },
  { subject: 'Backend', A: 85, fullMark: 100 },
  { subject: 'Security', A: 95, fullMark: 100 },
  { subject: 'DevOps', A: 75, fullMark: 100 },
  { subject: 'Cloud', A: 80, fullMark: 100 },
  { subject: 'AI/ML', A: 70, fullMark: 100 },
];

const performanceData = [
  { name: 'Mon', commits: 12, PRs: 2 },
  { name: 'Tue', commits: 19, PRs: 4 },
  { name: 'Wed', commits: 15, PRs: 3 },
  { name: 'Thu', commits: 22, PRs: 5 },
  { name: 'Fri', commits: 28, PRs: 6 },
  { name: 'Sat', commits: 8, PRs: 1 },
  { name: 'Sun', commits: 5, PRs: 0 },
];

const growthData = [
  { month: 'Jan', value: 40 },
  { month: 'Feb', value: 55 },
  { month: 'Mar', value: 45 },
  { month: 'Apr', value: 70 },
  { month: 'May', value: 65 },
  { month: 'Jun', value: 85 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'rgba(9, 9, 11, 0.9)', border: '1px solid var(--border-default)', padding: '12px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
        <p style={{ color: 'var(--text-primary)', marginBottom: 4, fontWeight: 600 }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, fontSize: '0.9rem' }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AIAnalytics() {
  return (
    <section id="analytics" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(6,182,212,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={20} color="var(--accent-secondary)" />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Performance Analytics</h2>
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          
          {/* Skill Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-panel"
            style={{ padding: 24, display: 'flex', flexDirection: 'column', minHeight: 360 }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>Skill Distribution Radar</h3>
            <div style={{ flex: 1, width: '100%', minHeight: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="var(--border-default)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Proficiency" dataKey="A" stroke="var(--accent-primary)" fill="var(--accent-primary)" fillOpacity={0.4} />
                  <RechartsTooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Activity Over Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel"
            style={{ padding: 24, display: 'flex', flexDirection: 'column', minHeight: 360, gridColumn: 'auto / span min(2, auto)' }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>Weekly Development Activity</h3>
            <div style={{ flex: 1, width: '100%', minHeight: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPRs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-secondary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--accent-secondary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--text-muted)" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-muted)" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="commits" name="Commits" stroke="var(--accent-primary)" fillOpacity={1} fill="url(#colorCommits)" />
                  <Area type="monotone" dataKey="PRs" name="Pull Requests" stroke="var(--accent-secondary)" fillOpacity={1} fill="url(#colorPRs)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Monthly Growth */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-panel"
            style={{ padding: 24, display: 'flex', flexDirection: 'column', minHeight: 360 }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>Impact Growth (2024)</h3>
            <div style={{ flex: 1, width: '100%', minHeight: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--text-muted)" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-muted)" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" name="Impact Score" fill="var(--color-success)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
