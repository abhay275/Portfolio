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

  const handleSubmit = () => {
    setSending(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
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
    <section id="contact" style={{ padding: '120px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <p className="section-tag" style={{ justifyContent: 'center', marginBottom: 14 }}>
            Let's Connect
          </p>
          <h2 className="section-title" style={{ marginBottom: 18 }}>
            Get In{' '}
            <span className="text-gradient">Touch</span>
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            maxWidth: 480,
            margin: '0 auto',
            lineHeight: 1.7,
            fontSize: '0.95rem',
          }}>
            Let's build secure, scalable solutions together. Reach out for collaborations or opportunities.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 24,
          alignItems: 'start',
        }}>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="card" style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <MessageSquare size={16} style={{ color: 'var(--accent-primary)' }} />
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Send a Message
                </h3>
              </div>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    textAlign: 'center',
                    padding: '32px',
                    background: 'rgba(34, 197, 94, 0.05)',
                    border: '1px solid rgba(34, 197, 94, 0.15)',
                    borderRadius: 12,
                  }}
                >
                  <Check size={28} style={{ color: 'var(--color-success)', margin: '0 auto 12px', display: 'block' }} />
                  <p style={{ color: 'var(--color-success)', fontWeight: 600, fontSize: '0.95rem' }}>Message Sent!</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: 6 }}>
                    I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form
                  action={`https://formsubmit.co/${EMAIL}`}
                  method="POST"
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
                >
                  <input type="hidden" name="_subject" value="New message from Portfolio!" />
                  <input type="hidden" name="_captcha" value="false" />

                  <div>
                    <label className="font-mono" htmlFor="contact-name" style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.7rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: 6,
                    }}>
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                      className="form-input"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 8, fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label className="font-mono" htmlFor="contact-email" style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.7rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: 6,
                    }}>
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      type="email"
                      placeholder="you@example.com"
                      className="form-input"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 8, fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label className="font-mono" htmlFor="contact-message" style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.7rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: 6,
                    }}>
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="What's on your mind?"
                      className="form-input"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 8, fontSize: '0.88rem', resize: 'vertical', minHeight: 120 }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="btn-primary"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
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
                          style={{
                            display: 'inline-block',
                            width: 14,
                            height: 14,
                            border: '2px solid rgba(255,255,255,0.3)',
                            borderTop: '2px solid white',
                            borderRadius: '50%',
                          }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right side: Info + Social */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            {/* Location + Availability */}
            <div className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <MapPin size={16} style={{ color: 'var(--accent-primary)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.88rem' }}>Based in India</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: 2 }}>Open to Remote Opportunities</div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '4px 10px',
                borderRadius: 20,
                background: 'rgba(34, 197, 94, 0.08)',
                border: '1px solid rgba(34, 197, 94, 0.15)',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-success)', display: 'inline-block' }} />
                <span className="font-mono" style={{ color: 'var(--color-success)', fontSize: '0.68rem' }}>Available</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <motion.button
                onClick={copyEmail}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="card"
                style={{
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  color: copied ? 'var(--color-success)' : 'var(--text-secondary)',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  fontFamily: 'var(--font-sans)',
                  transition: 'all 0.2s ease',
                }}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? 'Copied!' : 'Copy Email'}
              </motion.button>

              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="card"
                style={{
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                }}
              >
                <Download size={15} />
                Resume
              </motion.a>
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
                  initial={{ opacity: 0, x: 16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                  className="card card-interactive"
                  aria-label={`Visit ${s.label} profile`}
                  style={{
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: 9,
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-default)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={16} style={{ color: 'var(--text-secondary)' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.85rem' }}>{s.label}</div>
                    <div className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: 1 }}>{s.handle}</div>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>↗</div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
