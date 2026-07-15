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
    <footer style={{ position: 'relative' }}>
      {/* Top divider */}
      <div style={{
        height: 1,
        background: 'var(--border-default)',
      }} />

      <div style={{
        background: 'var(--bg-secondary)',
        padding: '40px 24px 28px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 32,
            justifyContent: 'space-between',
            marginBottom: 36,
            alignItems: 'flex-start',
          }}>
            {/* Brand */}
            <div style={{ maxWidth: 280 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 12,
              }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Terminal size={14} style={{ color: 'white' }} />
                </div>
                <span style={{
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                }}>
                  Abhay<span style={{ color: 'var(--accent-primary)' }}>.dev</span>
                </span>
              </div>
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '0.82rem',
                lineHeight: 1.7,
              }}>
                Building secure systems and shipping scalable products.
                Software Engineer & Cybersecurity Enthusiast.
              </p>
            </div>

            {/* Nav links */}
            <div>
              <h4 className="font-mono" style={{
                color: 'var(--text-muted)',
                fontSize: '0.68rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: 14,
              }}>
                Navigation
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {links.map(l => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={e => {
                      e.preventDefault();
                      document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      transition: 'color 0.2s ease',
                    }}
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
              <h4 className="font-mono" style={{
                color: 'var(--text-muted)',
                fontSize: '0.68rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: 14,
              }}>
                Connect
              </h4>
              <div style={{ display: 'flex', gap: 8 }}>
                {socials.map(s => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      title={s.label}
                      aria-label={s.label}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        border: '1px solid var(--border-default)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'var(--border-hover)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'var(--border-default)';
                        e.currentTarget.style.color = 'var(--text-muted)';
                      }}
                    >
                      <Icon size={14} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            height: 1,
            background: 'var(--border-default)',
            marginBottom: 20,
          }} />

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <p className="font-mono" style={{
              color: 'var(--text-muted)',
              fontSize: '0.7rem',
            }}>
              © {year} Abhay Singh. Built with React.
            </p>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                borderRadius: 8,
                border: '1px solid var(--border-default)',
                background: 'transparent',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--border-hover)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-default)';
                e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              <ArrowUp size={12} />
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
