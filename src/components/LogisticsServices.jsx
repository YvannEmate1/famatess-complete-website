import { useRef, useState, useEffect } from 'react';
import { C, FD, FB } from '../theme';
import SLabel from './SLabel';
import { useLanguage } from '../i18n';

function useInView(th = 0.08) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } },
      { threshold: th }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [th]);
  return [ref, v];
}

const SERVICE_COLORS = {
  'import-export': C.blue,
  'heavy-haulage': C.orange,
  'road-transport': C.green,
  'warehousing':   C.purple,
};

function ServiceBlock({ service, index, fallbackLabel }) {
  const [ref, visible] = useInView(0.08);
  const isEven = index % 2 === 0;
  const color = SERVICE_COLORS[service.id] || service.color || C.orange;

  // We use a CSS class for the grid to handle the breakpoint via the <style> tag below
  const gridClassName = `service-grid-${service.id}`;

  return (
    <div ref={ref} id={service.id} style={{ scrollMarginTop: 80 }}>
      <div className="responsive-grid" style={{
        display: 'grid',
        gap: '40px 64px',
        alignItems: 'center',
        direction: isEven ? 'ltr' : 'rtl',
      }}>

        {/* ── Text side ── */}
        <div style={{
          direction: 'ltr',
          animation: visible ? 'lgFadeUp 0.65s ease 0.05s both' : 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div style={{
              width: 52, height: 52,
              background: `${color}18`,
              border: `1.5px solid ${color}35`,
              borderRadius: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, flexShrink: 0,
            }}>
              {service.icon}
            </div>
            <div>
              <h2 className="service-title" style={{ fontFamily: FD, fontWeight: 700, color: C.textBody, lineHeight: 1.1 }}>
                {service.title}
              </h2>
              <span style={{
                fontFamily: FB, fontSize: 11, color: color,
                fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
              }}>
                {service.subtitle}
              </span>
            </div>
          </div>

          <p style={{
            fontFamily: FB, fontSize: 15, fontWeight: 400,
            color: C.textMuted, lineHeight: 1.85, marginBottom: 24,
          }}>
            {service.desc}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {(service.points || []).map((pt, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 0',
                borderBottom: `1px solid ${C.borderLight}`,
                animation: visible ? `lgFadeUp 0.5s ease ${i * 0.06 + 0.15}s both` : 'none',
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: color, flexShrink: 0,
                }} />
                <span style={{ fontFamily: FB, fontSize: 14, color: C.textBody }}>{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Image side ── */}
        <div style={{
          direction: 'ltr',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          animation: visible ? 'lgFadeUp 0.7s ease 0.1s both' : 'none',
        }}>
          {(service.images || []).map((img, i) => (
            <div key={img.src}
              className="service-image-card"
              style={{
                gridColumn: i === 0 ? '1 / -1' : 'auto',
                borderRadius: 6, overflow: 'hidden',
                background: C.cardImgBg,
                border: `1px solid ${C.borderLight}`,
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                transition: 'transform 0.25s, box-shadow 0.25s',
              }}
              onMouseEnter={e => { 
                if(window.innerWidth > 1024) {
                  e.currentTarget.style.transform = 'translateY(-4px)'; 
                  e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.1), 0 0 0 2px ${color}40`;
                }
              }}
              onMouseLeave={e => { 
                e.currentTarget.style.transform = 'translateY(0)'; 
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; 
              }}
            >
              <div className="image-container" style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src={img.src}
                  alt={img.caption}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={e => { if(window.innerWidth > 1024) e.currentTarget.style.transform = 'scale(1.05)' }}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextSibling.style.display = 'flex';
                  }}
                />
                <div style={{
                  display: 'none', position: 'absolute', inset: 0,
                  alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column', gap: 8,
                  background: C.cardImgBg,
                  color: C.silver, fontFamily: FB, fontSize: 12,
                }}>
                  <span style={{ fontSize: 40, opacity: 0.22 }}>{service.icon}</span>
                  <span style={{ opacity: 0.4 }}>{fallbackLabel}</span>
                </div>
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent)',
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute', top: 12, left: 12,
                  background: color, color: '#fff',
                  fontFamily: FB, fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  padding: '3px 10px', borderRadius: 3,
                }}>
                  {service.title}
                </div>
              </div>
              <div style={{ padding: '10px 14px', borderTop: `1px solid ${C.borderLight}` }}>
                <span style={{ fontFamily: FB, fontSize: 12, color: C.textMuted }}>{img.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LogisticsServices() {
  const { t } = useLanguage();
  const [ref, visible] = useInView(0.1);

  const header   = t('parts.components.logistics.header')   || {};
  const services = t('parts.components.logistics.services') || [];
  const fallback = t('parts.components.logistics.imageFallback') || 'Image coming soon';

  return (
    <section className="logistics-section" style={{ background: C.pageBg }}>
      <div className="container" style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Header */}
        <div ref={ref} className="header-block" style={{ animation: visible ? 'lgFadeUp 0.6s ease both' : 'none' }}>
          <SLabel>{header.label}</SLabel>
          <h2 className="main-title" style={{ fontFamily: FD, fontWeight: 700, color: C.textBody, lineHeight: 1.08 }}>
            {(header.title || '').split('\n').map((line, i, arr) => (
              <span key={i}>
                {i === arr.length - 1
                  ? <em style={{ color: C.orange, fontStyle: 'italic' }}>{line}</em>
                  : <>{line}<br className="desktop-br" /></>
                }
              </span>
            ))}
          </h2>
        </div>

        {/* Service blocks */}
        <div className="services-stack" style={{ display: 'flex', flexDirection: 'column' }}>
          {services.map((service, i) => (
            <div key={service.id}>
              <ServiceBlock service={service} index={i} fallbackLabel={fallback} />
              {i < services.length - 1 && (
                <div className="divider" style={{ height: 1, background: C.borderLight }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* Desktop/Base Defaults */
        .logistics-section { padding: 96px 0; }
        .container { padding: 0 64px; }
        .header-block { marginBottom: 72px; }
        .main-title { fontSize: 48px; }
        .service-title { fontSize: 30px; }
        .responsive-grid { grid-template-columns: 1fr 1fr; }
        .services-stack { gap: 96px; }
        .divider { margin-top: 96px; }
        .image-container { height: 180px; }
        .image-container:first-child { height: 280px; } /* targeting logic inside mapping */

        @keyframes lgFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Tablet & Mobile Breakpoint */
        @media (max-width: 1024px) {
          .logistics-section { padding: 64px 0; }
          .container { padding: 0 24px; }
          .header-block { margin-bottom: 48px; text-align: center; }
          .main-title { fontSize: 32px; }
          .desktop-br { display: none; }
          
          .responsive-grid { 
            grid-template-columns: 1fr; 
            direction: ltr !important; 
            gap: 32px;
          }
          
          .services-stack { gap: 64px; }
          .divider { margin-top: 64px; }
          
          .service-title { fontSize: 24px; }
          
          /* Adjust image heights for smaller screens */
          .image-container { height: 200px !important; }
        }

        @media (max-width: 480px) {
          .main-title { fontSize: 28px; }
          .service-image-card:not(:first-child) {
             grid-column: 1 / -1 !important; /* Stack images vertically on very small phones */
          }
        }
      `}</style>
    </section>
  );
}