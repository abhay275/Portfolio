import { motion } from 'framer-motion';
import { ShieldAlert, Server, Lock, AlertTriangle, CheckCircle, Search, Activity } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const threatData = [
  { time: '00:00', threats: 12 },
  { time: '04:00', threats: 8 },
  { time: '08:00', threats: 45 },
  { time: '12:00', threats: 28 },
  { time: '16:00', threats: 60 },
  { time: '20:00', threats: 15 },
  { time: '24:00', threats: 9 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'rgba(9, 9, 11, 0.9)', border: '1px solid var(--border-default)', padding: '10px', borderRadius: '8px' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 4 }}>{label}</p>
        <p style={{ color: 'var(--color-warning)', fontWeight: 600 }}>Blocked: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function Cybersecurity() {
  return (
    <section id="cybersecurity" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldAlert size={20} color="var(--color-warning)" />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Security Operations Center</h2>
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          
          {/* Active Monitoring */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-panel"
            style={{ padding: 24 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Activity size={18} color="var(--accent-secondary)" />
                Live Network Traffic
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="animate-pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-success)', display: 'inline-block' }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontFamily: 'var(--font-mono)' }}>SECURE</span>
              </div>
            </div>
            
            <div style={{ width: '100%', height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={threatData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />
                  <XAxis dataKey="time" stroke="var(--text-muted)" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-muted)" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="threats" stroke="var(--color-warning)" strokeWidth={2} dot={{ r: 4, fill: 'var(--bg-primary)', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Infrastructure Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel"
            style={{ padding: 24, display: 'flex', flexDirection: 'column' }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Server size={18} color="var(--accent-primary)" />
              Cloud Infrastructure Posture
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
              {[
                { title: 'IAM Roles', status: 'Compliant', icon: Lock, color: 'var(--color-success)' },
                { title: 'WAF Rules', status: 'Active Blocking', icon: ShieldAlert, color: 'var(--color-success)' },
                { title: 'Vulnerability Scan', status: '2 Low severity', icon: Search, color: 'var(--color-warning)' },
                { title: 'Intrusion Detection', status: 'Monitoring', icon: AlertTriangle, color: 'var(--color-success)' },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid var(--border-default)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <item.icon size={16} color="var(--text-secondary)" />
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item.title}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {item.status === 'Compliant' || item.status === 'Monitoring' || item.status === 'Active Blocking' ? 
                      <CheckCircle size={14} color="var(--color-success)" /> : 
                      <AlertTriangle size={14} color="var(--color-warning)" />
                    }
                    <span style={{ fontSize: '0.8rem', color: item.color, fontFamily: 'var(--font-mono)' }}>{item.status}</span>
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
