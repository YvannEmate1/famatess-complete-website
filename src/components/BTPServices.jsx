import { useRef, useState, useEffect } from 'react';
import { C, FD, FB } from '../theme';
import SLabel from './SLabel';
import { useLanguage } from '../i18n';

/* ── useInView ── */
function useInView(th = 0.1) {
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

/* ── Single service section ── */
function ServiceSection({ service, index }) {
  const [ref, visible] = useInView(0.08);
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} id={service.id} style={{ scrollMarginTop: 80 }}>
      <div className="service-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(32px, 6vw, 64px)',
        alignItems: 'center',
        // Direction only flips on desktop via CSS class below
      }}>

        {/* Text side */}
        <div className={isEven ? 'order-1' : 'order-2'} style={{
          animation: visible ? `btpFadeUp 0.65s ease ${0.05}s both` : 'none',
        }}>
          {/* Icon + label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div style={{
              width: 'clamp(44px, 5vw, 52px)', height: 'clamp(44px, 5vw, 52px)',
              background: `${service.color}18`,
              border: `1.5px solid ${service.color}35`,
              borderRadius: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 'clamp(20px, 2.5vw, 24px)', flexShrink: 0,
            }}>
              {service.icon}
            </div>
            <div>
              <h2 style={{ 
                fontFamily: FD, 
                fontSize: 'clamp(24px, 4vw, 32px)', 
                fontWeight: 700, 
                color: C.textBody, 
                lineHeight: 1.1 
              }}>
                {service.title}
              </h2>
              <span style={{
                fontFamily: FB,
                fontSize: 'clamp(9px, 1.2vw, 11px)',
                color: service.color,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                {service.subtitle}
              </span>
            </div>
          </div>

          <p style={{
            fontFamily: FB, 
            fontSize: 'clamp(14px, 1.8vw, 15px)', 
            fontWeight: 400,
            color: C.textMuted, 
            lineHeight: 1.85, 
            marginBottom: 24,
          }}>
            {service.desc}
          </p>

          {/* Bullet points */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {service.points && service.points.map((pt, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 0',
                borderBottom: `1px solid ${C.borderLight}`,
                animation: visible ? `btpFadeUp 0.5s ease ${i * 0.06 + 0.15}s both` : 'none',
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: service.color, flexShrink: 0,
                }} />
                <span style={{ 
                  fontFamily: FB, 
                  fontSize: 'clamp(13px, 1.6vw, 14px)', 
                  color: C.textBody 
                }}>{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Image side */}
        <div className={isEven ? 'order-2' : 'order-1'} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 12,
          animation: visible ? 'btpFadeUp 0.7s ease 0.1s both' : 'none',
        }}>
          {service.images && service.images.map((img, i) => (
            <div key={i}
              style={{
                gridColumn: (service.images.length === 1 || i === 0) ? '1 / -1' : 'auto',
                borderRadius: 6,
                overflow: 'hidden',
                background: C.cardImgBg,
                border: `1px solid ${C.borderLight}`,
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                transition: 'transform 0.25s, box-shadow 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.1), 0 0 0 2px ${service.color}40`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}
            >
              <div style={{
                height: (service.images.length === 1 || i === 0) ? 'clamp(200px, 30vw, 280px)' : 'clamp(140px, 20vw, 180px)',
                position: 'relative', overflow: 'hidden',
              }}>
                <img
                  src={img.src}
                  alt={img.caption}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
                />
                <div style={{
                  display: 'none', position: 'absolute', inset: 0,
                  alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column', gap: 8,
                  background: C.cardImgBg,
                  color: C.silver, fontFamily: FB, fontSize: 12,
                }}>
                  <span style={{ fontSize: 40, opacity: 0.25 }}>{service.icon}</span>
                  <span style={{ opacity: 0.4 }}>Image coming soon</span>
                </div>
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent)',
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute', top: 12, left: 12,
                  background: service.color, color: '#fff',
                  fontFamily: FB, fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  padding: '3px 10px', borderRadius: 3,
                }}>
                  {service.title}
                </div>
              </div>
              <div style={{ padding: '10px 14px' }}>
                <span style={{ fontFamily: FB, fontSize: 12, color: C.textMuted }}>{img.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes btpFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .service-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .order-1 { order: 1; }
          .order-2 { order: 2; }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   BTPServices — exported component
───────────────────────────────────────────── */
export default function BTPServices() {
  const { t } = useLanguage();
  const [ref, visible] = useInView(0.1);
  const services = t('parts.components.btpServices.services', [], { returnObjects: true }) || [];

  return (
    <section style={{ 
      background: C.pageBg, 
      padding: 'clamp(64px, 10vw, 96px) 0' 
    }}>
      <div style={{ 
        maxWidth: 1280, 
        margin: '0 auto', 
        padding: '0 clamp(20px, 5vw, 64px)' 
      }}>

        {/* Header */}
        <div ref={ref} style={{ 
          marginBottom: 'clamp(48px, 8vw, 72px)', 
          animation: visible ? 'btpFadeUp 0.6s ease both' : 'none' 
        }}>
          <SLabel>{t('parts.components.btpServices.label')}</SLabel>
          <h2 style={{ 
            fontFamily: FD, 
            fontSize: 'clamp(32px, 6vw, 48px)', 
            fontWeight: 700, 
            color: C.textBody, 
            lineHeight: 1.08 
          }}>
            {t('parts.components.btpServices.headline')}
            <br />
            <em style={{ color: C.orange, fontStyle: 'italic' }}>{t('parts.components.btpServices.headlineEm')}</em>
          </h2>
        </div>

        {/* Service sections */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 'clamp(64px, 12vw, 96px)' 
        }}>
          {services.map((service, i) => (
            <div key={service.id}>
              <ServiceSection service={service} index={i} />
              {i < services.length - 1 && (
                <div style={{
                  height: 1, background: C.borderLight,
                  marginTop: 'clamp(64px, 12vw, 96px)',
                }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}