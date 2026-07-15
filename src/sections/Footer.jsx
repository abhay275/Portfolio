import { Mail, Terminal, ArrowUp } from 'lucide-react';
import { FaGithub as GithubIcon, FaLinkedin as LinkedinIcon, FaInstagram as InstagramIcon } from 'react-icons/fa';

const links = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

const socials = [
  { icon: GithubIcon, href: 'https://github.com/abhay275', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/abhay-singh-b38b39279/', label: 'LinkedIn' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/abhay14_s/', label: 'Instagram' },
  { icon: Mail, href: 'mailto:singhabhay4194@gmail.com', label: 'Email' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ position: 'relative', marginTop: 80 }}>
      {/* Top divider */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border-default), transparent)' }} />

      <div style={{ padding: '60px 24px 32px', background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, marginBottom: 64 }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Terminal size={20} style={{ color: 'var(--accent-primary)' }} />
                </div>
                <span style={{ fontWeight: 700, fontSize: '1.2rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                  Abhay<span style={{ color: 'var(--accent-primary)' }}>.dev</span>
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 320 }}>
                Building secure systems and shipping scalable products. Software Engineer & Cybersecurity Enthusiast.
              </p>
            </div>

            {/* Nav links */}
            <div>
              <h4 className="font-mono" style={{ color: 'var(--text-primary)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
                Navigation
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {links.map(l => (
                  <a
                    key={l.label} href={l.href}
                    onClick={e => {
                      e.preventDefault();
                      document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s ease', padding: '4px 0' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div>
              <h4 className="font-mono" style={{ color: 'var(--text-primary)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
                Connect
              </h4>
              <div style={{ display: 'flex', gap: 12 }}>
                {socials.map(s => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label} aria-label={s.label}
                      style={{
                        width: 44, height: 44, borderRadius: 12, border: '1px solid var(--border-default)',
                        background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--text-secondary)', textDecoration: 'none', transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'var(--border-hover)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'var(--border-default)';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ height: 1, background: 'var(--border-default)', marginBottom: 24 }} />

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
            <p className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              © {year} Abhay Singh. All rights reserved.
            </p>

            <button
              onClick={scrollToTop} aria-label="Back to top"
              style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 20,
                border: '1px solid var(--border-default)', background: 'rgba(255,255,255,0.03)', color: 'var(--text-secondary)',
                cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--border-hover)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-default)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              <ArrowUp size={14} />
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
