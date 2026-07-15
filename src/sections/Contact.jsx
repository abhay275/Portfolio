import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Send, MapPin, MessageSquare, Copy, Check, Download } from 'lucide-react';
import { FaGithub as GithubIcon, FaLinkedin as LinkedinIcon, FaInstagram as InstagramIcon } from 'react-icons/fa';

const EMAIL = 'singhabhay4194@gmail.com';

const socials = [
  { icon: GithubIcon, label: 'GitHub', url: 'https://github.com/abhay275', handle: '@abhay275' },
  { icon: LinkedinIcon, label: 'LinkedIn', url: 'https://www.linkedin.com/in/abhay-singh-b38b39279/', handle: 'Abhay Singh' },
  { icon: InstagramIcon, label: 'Instagram', url: 'https://www.instagram.com/abhay14_s/', handle: '@abhay14_s' },
  { icon: Mail, label: 'Email', url: `mailto:${EMAIL}`, handle: EMAIL },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    // Simulate form submission
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    }, 1500);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement('textarea');
      el.value = EMAIL;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="contact" style={{ padding: '120px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageSquare size={20} color="var(--accent-primary)" />
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>Get In Touch</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7, fontSize: '1.05rem' }}>
            Let's build secure, scalable solutions together. Reach out for collaborations or opportunities.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 32, alignItems: 'start' }}>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass-panel"
            style={{ padding: 40 }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 24 }}>Send a Message</h3>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '40px', background: 'rgba(34, 197, 94, 0.05)', border: '1px solid rgba(34, 197, 94, 0.15)', borderRadius: 16 }}
              >
                <Check size={32} style={{ color: 'var(--color-success)', margin: '0 auto 16px', display: 'block' }} />
                <p style={{ color: 'var(--color-success)', fontWeight: 600, fontSize: '1.1rem' }}>Message Sent!</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: 8 }}>I'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Name</label>
                  <input
                    name="name" value={form.name} onChange={handleChange} required type="text" placeholder="Your Name"
                    style={{ width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: '0.95rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>

                <div>
                  <label className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Email</label>
                  <input
                    name="email" value={form.email} onChange={handleChange} required type="email" placeholder="you@example.com"
                    style={{ width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: '0.95rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>

                <div>
                  <label className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Message</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="What's on your mind?"
                    style={{ width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: '0.95rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', resize: 'vertical', minHeight: 120, outline: 'none' }}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={sending}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px', fontSize: '1rem', width: '100%', marginTop: 8 }}
                >
                  {sending ? 'Sending...' : <><Send size={18} /> Send Message</>}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Right side: Info + Social */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
          >
            {/* Location */}
            <div className="glass-card" style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={24} style={{ color: 'var(--accent-primary)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.05rem' }}>Based in India</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: 4 }}>Open to Remote Opportunities</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 20, background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-success)' }} />
                <span className="font-mono" style={{ color: 'var(--color-success)', fontSize: '0.75rem' }}>Available</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <motion.button
                onClick={copyEmail}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glass-card card-interactive"
                style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', color: copied ? 'var(--color-success)' : 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500 }}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? 'Copied!' : 'Copy Email'}
              </motion.button>

              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glass-card card-interactive"
                style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}
              >
                <Download size={18} /> Resume
              </motion.a>
            </div>

            {/* Social cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {socials.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="glass-card card-interactive"
                    style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textDecoration: 'none', textAlign: 'center' }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={20} style={{ color: 'var(--text-primary)' }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{s.label}</div>
                      <div className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 4 }}>{s.handle}</div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
