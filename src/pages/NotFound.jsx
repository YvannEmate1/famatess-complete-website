import { Link } from 'react-router-dom';
import { C, FD, FB } from '../theme';
import { useLanguage } from '../i18n';

export default function NotFound() {
  const { t } = useLanguage();

  // Retrieve data from translation.json
  const data = t('parts.components.notFound') || {};

  // HARD FALLBACKS: This prevents the "Blank Screen" if JSON is missing
  const label = data.label || "404 — PAGE NOT FOUND";
  const titleLine1 = data.titleLine1 || "This page";
  const titleHighlight = data.titleHighlight || "doesn't exist.";
  const description = data.description || "The link you followed may be broken or moved. Head back to our homepage.";
  const ctaHome = data.ctaHome || "Back to Homepage";
  const ctaContact = data.ctaContact || "Contact Us";
  const watermark = data.watermark || "404";
  const quickNavLabel = data.quickNavLabel || "Or jump to:";

  // Default links if the translation array is empty
  const defaultLinks = [
    { label: 'Famatess Automobile', href: '#/automobile' },
    { label: 'BTP', href: '#/btp' },
    { label: 'Logistics', href: '#/logistics' },
    { label: 'About Us', href: '#/about-us' },
    { label: 'Contact', href: '#/localisation' }
  ];
  const quickLinks = Array.isArray(data.links) ? data.links : defaultLinks;

  return (
    <section style={{
      background: C.black || '#0a0a0a',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 'clamp(64px, 10vw, 120px) 0',
    }}>

      {/* Decorative layers */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '45%', height: '100%',
        background: 'rgba(255,140,30,0.04)',
        clipPath: 'polygon(18% 0,100% 0,100% 100%,0% 100%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(to right, ${C.orange}, transparent 60%)`,
      }} />

      {/* Ghost Watermark */}
      <div style={{
        position: 'absolute', right: 'clamp(0px, 3vw, 40px)', top: '50%', transform: 'translateY(-52%)',
        fontFamily: FD, fontSize: 'clamp(100px, 22vw, 320px)', fontWeight: 900,
        color: 'rgba(255,140,30,0.05)', lineHeight: 1,
        userSelect: 'none', pointerEvents: 'none',
        letterSpacing: '-0.04em',
      }}>
        {watermark}
      </div>

      <div style={{
        maxWidth: 1280, margin: '0 auto', width: '100%',
        padding: '0 clamp(20px, 5vw, 64px)',
        position: 'relative', zIndex: 2,
      }}>

        {/* Orange pill label */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          marginBottom: 'clamp(20px, 3vw, 28px)',
          animation: 'nfFadeUp 0.5s ease both',
        }}>
          <div style={{ width: 24, height: 2, background: C.orange, borderRadius: 2 }} />
          <span style={{
            fontFamily: FB, fontSize: 'clamp(10px, 1.5vw, 11px)', fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: C.orange,
          }}>
            {label}
          </span>
        </div>

        {/* Main headline */}
        <h1 style={{
          fontFamily: FD,
          fontSize: 'clamp(40px, 7vw, 96px)',
          fontWeight: 900,
          color: C.white,
          lineHeight: 1.0,
          marginBottom: 'clamp(16px, 2.5vw, 24px)',
          animation: 'nfFadeUp 0.6s ease 0.05s both',
        }}>
          {titleLine1}<br />
          <em style={{ color: C.orange, fontStyle: 'italic' }}>
            {titleHighlight}
          </em>
        </h1>

        <p style={{
          fontFamily: FB,
          fontSize: 'clamp(14px, 2vw, 16px)',
          fontWeight: 300,
          color: C.graphite,
          maxWidth: 520,
          lineHeight: 1.8,
          marginBottom: 'clamp(28px, 5vw, 44px)',
          animation: 'nfFadeUp 0.6s ease 0.1s both',
        }}>
          {description}
        </p>

        {/* Action buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 14,
          animation: 'nfFadeUp 0.6s ease 0.15s both',
        }}>
          <Link to="/home"
            style={{
              fontFamily: FB,
              fontSize: 'clamp(13px, 1.8vw, 14px)',
              fontWeight: 700,
              background: C.orange,
              color: C.black,
              padding: 'clamp(11px, 2vw, 14px) clamp(22px, 4vw, 32px)',
              borderRadius: 2,
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            ← {ctaHome}
          </Link>

          <Link to="/localisation"
            style={{
              fontFamily: FB,
              fontSize: 'clamp(13px, 1.8vw, 14px)',
              fontWeight: 500,
              color: C.white,
              border: '1.5px solid rgba(220,220,224,0.35)',
              padding: 'clamp(10px, 2vw, 13px) clamp(20px, 4vw, 28px)',
              borderRadius: 2,
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            {ctaContact}
          </Link>
        </div>

        {/* Quick nav */}
        <div style={{
          marginTop: 'clamp(40px, 7vw, 64px)',
          paddingTop: 'clamp(24px, 4vw, 32px)',
          borderTop: '1px solid rgba(80,80,88,0.35)',
          animation: 'nfFadeUp 0.6s ease 0.2s both',
        }}>
          <p style={{
            fontFamily: FB, fontSize: 'clamp(11px, 1.5vw, 12px)',
            color: C.graphite, marginBottom: 16,
            textTransform: 'uppercase', letterSpacing: '0.12em',
          }}>
            {quickNavLabel}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {quickLinks.map((link, idx) => (
              <Link key={idx} to={link.href.replace(/^#/, '')}
                style={{
                  fontFamily: FB,
                  fontSize: 'clamp(12px, 1.6vw, 13px)',
                  fontWeight: 500,
                  color: C.graphite,
                  background: 'rgba(80,80,88,0.15)',
                  border: '1px solid rgba(80,80,88,0.35)',
                  padding: '7px 16px',
                  borderRadius: 2,
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes nfFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}