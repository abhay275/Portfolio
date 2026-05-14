import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Send, MapPin, MessageSquare } from 'lucide-react';
import { FaGithub as Github, FaLinkedin as Linkedin, FaInstagram as Instagram } from 'react-icons/fa';

const socials = [
  { icon: Github, label: 'GitHub', url: 'https://github.com/abhay275', color: '#f0f0f0', handle: '@abhay275' },
  { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/abhay-singh-b38b39279/', color: '#0077b5', handle: '/in/abhay-singh-b38b39279' },
  { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/abhay14_s/', color: '#E1306C', handle: '@abhay14_s' },
  { icon: Mail, label: 'Email', url: 'mailto:singhabhay4194@gmail.com', color: '#ff006e', handle: 'singhabhay4194@gmail.com' },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    setSending(true);
    // Allow the form to submit natively to FormSubmit.co
  };

  return (
    <section id="contact" style={{ padding: '100px 24px', background: 'rgba(6,13,26,0.5)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <p className="section-tag" style={{ justifyContent: 'center', marginBottom: 16 }}>Let's Connect</p>
          <h2 className="section-title" style={{ marginBottom: 20 }}>
            <span style={{ color: '#e2e8f0' }}>Get In </span>
            <span className="text-gradient">Touch</span>
          </h2>
          <p style={{ color: '#64748b', maxWidth: 500, margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Whether you want to collaborate, discuss a project idea, or just say hi — my inbox is always open.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 32,
          alignItems: 'start',
        }}>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card" style={{ borderRadius: 20, padding: '36px', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                background: 'linear-gradient(90deg, transparent, #00d4ff, #7c3aed, transparent)',
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
                <MessageSquare size={18} style={{ color: '#00d4ff' }} />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#e2e8f0' }}>Send a Message</h3>
              </div>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    textAlign: 'center',
                    padding: '32px',
                    background: 'rgba(57,255,20,0.05)',
                    border: '1px solid rgba(57,255,20,0.2)',
                    borderRadius: 12,
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🚀</div>
                  <p style={{ color: '#39ff14', fontWeight: 600 }}>Message Sent!</p>
                  <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: 8 }}>
                    I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form action="https://formsubmit.co/singhabhay4194@gmail.com" method="POST" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <input type="hidden" name="_subject" value="New message from Portfolio!" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_next" value="http://localhost:5173/" />
                  <div>
                    <label className="font-mono" style={{ color: '#64748b', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                      Name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                      className="form-input"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: 10, fontSize: '0.9rem' }}
                    />
                  </div>

                  <div>
                    <label className="font-mono" style={{ color: '#64748b', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                      Email
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      type="email"
                      placeholder="you@example.com"
                      className="form-input"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: 10, fontSize: '0.9rem' }}
                    />
                  </div>

                  <div>
                    <label className="font-mono" style={{ color: '#64748b', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="What's on your mind?"
                      className="form-input"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: 10, fontSize: '0.9rem', resize: 'vertical', minHeight: 140 }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="btn-primary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    data-hover="true"
                    disabled={sending}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      width: '100%',
                      opacity: sending ? 0.7 : 1,
                    }}
                  >
                    {sending ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%' }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Social Links + Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
          >
            {/* Location */}
            <div className="glass-card" style={{ borderRadius: 16, padding: '22px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={18} style={{ color: '#00d4ff' }} />
              </div>
              <div>
                <div style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.9rem' }}>Based in India 🇮🇳</div>
                <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: 2 }}>Open to Remote Opportunities</div>
              </div>
            </div>

            {/* Social cards */}
            {socials.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="glass-card"
                  data-hover="true"
                  style={{
                    borderRadius: 14,
                    padding: '18px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    background: `${s.color}12`,
                    border: `1px solid ${s.color}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={18} style={{ color: s.color }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.9rem' }}>{s.label}</div>
                    <div className="font-mono" style={{ color: '#475569', fontSize: '0.75rem', marginTop: 2 }}>{s.handle}</div>
                  </div>
                  <div style={{ color: '#475569', fontSize: '0.85rem' }}>↗</div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
