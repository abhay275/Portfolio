import { Mail, Terminal, Code2 } from 'lucide-react';
import { FaGithub as Github, FaLinkedin as Linkedin, FaInstagram as Instagram } from 'react-icons/fa';

const links = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

const socials = [
  { icon: Github, href: 'https://github.com/abhay275', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/abhay-singh-b38b39279/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/abhay14_s/', label: 'Instagram' },
  { icon: Mail, href: 'mailto:singhabhay4194@gmail.com', label: 'Email' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ position: 'relative', paddingTop: 2 }}>
      {/* Glowing top divider */}
      <div style={{
        height: 1,
        background: 'linear-gradient(90deg, transparent, #00d4ff, #7c3aed, #06ffa5, transparent)',
        boxShadow: '0 0 20px rgba(0,212,255,0.4)',
      }} />

      <div
        className="glass-strong"
        style={{ padding: '48px 24px 32px' }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 32,
            justifyContent: 'space-between',
            marginBottom: 40,
            alignItems: 'flex-start',
          }}>
            {/* Brand */}
            <div style={{ maxWidth: 300 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Terminal size={16} style={{ color: 'white' }} />
                </div>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', color: '#e2e8f0' }}>
                  AbhaySingh<span className="text-gradient">.dev</span>
                </span>
              </div>
              <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.7 }}>
                Building intelligent systems and scalable products.
                AI/ML developer & full-stack engineer.
              </p>
              <div className="font-mono" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                marginTop: 14,
                color: '#39ff14',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                padding: '4px 10px',
                background: 'rgba(57,255,20,0.08)',
                border: '1px solid rgba(57,255,20,0.2)',
                borderRadius: 6,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#39ff14', boxShadow: '0 0 6px #39ff14' }} />
                Available for hire
              </div>
            </div>

            {/* Nav links */}
            <div>
              <h4 className="font-mono" style={{ color: '#475569', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>
                Navigation
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(l => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={e => { e.preventDefault(); document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' }); }}
                    style={{
                      color: '#64748b',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#00d4ff'}
                    onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div>
              <h4 className="font-mono" style={{ color: '#475569', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>
                Connect
              </h4>
              <div style={{ display: 'flex', gap: 12 }}>
                {socials.map(s => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      title={s.label}
                      data-hover="true"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        border: '1px solid rgba(0,212,255,0.15)',
                        background: 'rgba(0,212,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#64748b',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#00d4ff50'; e.currentTarget.style.color = '#00d4ff'; e.currentTarget.style.background = 'rgba(0,212,255,0.12)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.15)'; e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = 'rgba(0,212,255,0.05)'; }}
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            height: 1,
            background: 'rgba(255,255,255,0.05)',
            marginBottom: 24,
          }} />

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <p className="font-mono" style={{ color: '#334155', fontSize: '0.72rem' }}>
              © {year} Abhay Singh. Built with React & ❤️
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Code2 size={12} style={{ color: '#475569' }} />
              <span className="font-mono" style={{ color: '#334155', fontSize: '0.72rem' }}>
                Crafted with precision & caffeine
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
