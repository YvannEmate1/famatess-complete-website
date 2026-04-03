import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { C, FD, FB } from '../theme';
import { useLanguage } from '../i18n';
import SLabel from './SLabel';

export default function HeroMain() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  /* ── Slide backgrounds ── */
  const slideBgs = [
    `linear-gradient(135deg, ${C.charcoal} 0%, rgba(18,18,20,0.92) 50%, ${C.black} 100%)`,
    `linear-gradient(135deg, rgba(8,28,18,0.90) 0%, rgba(18,18,20,0.92) 55%, ${C.black} 100%)`,
    `linear-gradient(135deg, rgba(8,18,38,0.90) 0%, rgba(18,18,20,0.92) 55%, ${C.black} 100%)`,
  ];

  const rawSlides = t('parts.components.heroMain.slides');
  const slides = Array.isArray(rawSlides)
    ? rawSlides.map((slide, i) => ({
        tag: slide.tag || '',
        headline: slide.headline || '',
        sub: slide.sub || '',
        cta: slide.cta || '',
        link: slide.link || '',
        bg: slideBgs[i % slideBgs.length],
      }))
    : [];

  const rawStats = t('parts.components.heroMain.stats');
  const stats = Array.isArray(rawStats) ? rawStats : [];

  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setActive((p) => (p + 1) % slides.length);
      setAnimKey((k) => k + 1);
    }, 5500);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleDotClick = (i) => {
    setActive(i);
    setAnimKey((k) => k + 1);
  };

  const s = slides[active] || {};

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '91vh',
        width: '100%',
        background: s.bg || C.black,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        transition: 'background 1s ease',
        zIndex: 1,
      }}
    >
      {/* Decorative layers */}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '45%', height: '100%',
        background: 'rgba(255,140,30,0.04)', clipPath: 'polygon(18% 0,100% 0,100% 100%,0% 100%)',
        pointerEvents: 'none', zIndex: 2,
      }} />

      <div style={{
        position: 'absolute', left: 'clamp(20px, 5vw, 64px)', top: 0, bottom: 0, width: 1,
        background: 'linear-gradient(to bottom, transparent, rgba(255,140,30,0.35), transparent)',
        pointerEvents: 'none', zIndex: 2,
      }} />

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.12), rgba(0,0,0,0.38))',
        pointerEvents: 'none', zIndex: 3,
      }} />

      {/* Watermark */}
      <div style={{
        position: 'absolute', right: 40, top: '50%', transform: 'translateY(-52%)',
        fontFamily: FD, fontSize: 'clamp(70px, 11vw, 140px)', fontWeight: 900,
        color: 'rgba(255,140,30,0.04)', lineHeight: 1, userSelect: 'none',
        pointerEvents: 'none', letterSpacing: '-0.02em', whiteSpace: 'nowrap',
        zIndex: 2, display: 'var(--watermark-display, block)',
      }}>
        {t('parts.components.heroMain.watermark') || 'FAMATESS'}
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 4,
        background: `linear-gradient(to right, ${C.orange}, transparent 60%)`,
        zIndex: 10,
      }} />

      {/* Main content */}
      <div style={{
        position: 'relative', zIndex: 5, maxWidth: 1280, margin: '0 auto', width: '100%',
        padding: 'clamp(60px, 10vw, 80px) clamp(20px, 5vw, 64px) 72px',
        textAlign: 'left', 
      }}>
        <div key={`text-${animKey}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ animation: 'auFadeUp 0.6s ease both' }}>
            <SLabel>{s.tag}</SLabel>
          </div>

          <h1 style={{
            fontFamily: FD, fontSize: 'clamp(44px, 5.8vw, 84px)', fontWeight: 900,
            color: C.white, lineHeight: 0.97, marginBottom: 'clamp(16px, 3vw, 22px)',
            whiteSpace: 'pre-line', animation: 'auFadeUp 0.6s ease 0.05s both',
          }}>
            {(s.headline || '').split('\n').map((line, i, arr) => (
              <React.Fragment key={i}>
                {i === 1 ? <em style={{ color: C.orange, fontStyle: 'italic' }}>{line}</em> : line}
                {i < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>

          <p style={{
            fontFamily: FB, fontSize: 'clamp(14px, 2vw, 16px)', fontWeight: 300,
            color: C.graphite, maxWidth: 580, lineHeight: 1.8, marginBottom: 40,
            animation: 'auFadeUp 0.6s ease 0.1s both',
          }}>
            {s.sub}
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex', gap: 14, justifyContent: 'flex-start',
            alignItems: 'center', animation: 'auFadeUp 0.6s ease 0.15s both',
          }}>
            <button
              onClick={() => { if (s.link) navigate(s.link.replace(/^#/, '')); }}
              style={{
                fontFamily: FB, fontSize: 14, fontWeight: 700, background: C.orange,
                color: C.black, border: 'none', padding: '14px 32px', borderRadius: 2,
                cursor: 'pointer', letterSpacing: '0.04em', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = C.orangeDeep || C.orange; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = C.orange; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {s.cta}
            </button>

            <button
              onClick={() => navigate('/localisation')}
              style={{
                fontFamily: FB, fontSize: 14, fontWeight: 500, background: 'transparent',
                color: C.white, border: '1.5px solid rgba(220,220,224,0.4)',
                padding: '13px 28px', borderRadius: 2, cursor: 'pointer',
                letterSpacing: '0.04em', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.orange; e.currentTarget.style.color = C.orange; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(220,220,224,0.4)'; e.currentTarget.style.color = C.white; }}
            >
              {t('parts.components.heroMain.ctaSecondary') || 'Contact Us'}
            </button>
          </div>

          {/* Stats strip — Matching AboutHero Logic */}
          {stats.length > 0 && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'clamp(16px, 3vw, 0px)',
              marginTop: 'clamp(32px, 5vw, 48px)',
              paddingTop: 'clamp(20px, 4vw, 32px)',
              borderTop: '1px solid rgba(80,80,88,0.35)',
              animation: 'auFadeUp 0.6s ease 0.2s both',
              width: '100%',
              maxWidth: 700,
            }}>
              {stats.map((stat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    paddingLeft: i === 0 ? 0 : 'clamp(16px, 3vw, 32px)',
                    paddingRight: 'clamp(16px, 3vw, 32px)',
                    paddingBottom: 8,
                  }}>
                    <div style={{
                      fontFamily: FD,
                      fontSize: 'clamp(22px, 3vw, 28px)',
                      fontWeight: 900,
                      color: C.orange,
                      lineHeight: 1,
                    }}>
                      {stat?.num || ''}
                    </div>
                    <div style={{
                      fontFamily: FB,
                      fontSize: 'clamp(9px, 1.2vw, 10px)',
                      color: C.graphite,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginTop: 4,
                    }}>
                      {stat?.label || ''}
                    </div>
                  </div>

                  {/* Divider — hidden after last item AND on wrap via CSS */}
                  {i < stats.length - 1 && (
                    <div className="stat-divider" style={{ 
                      width: 1, height: 36, 
                      background: 'rgba(80,80,88,0.4)', 
                      flexShrink: 0 
                    }} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* DOTS */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 12, zIndex: 20,
      }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            style={{
              width: active === i ? 32 : 8, height: 8, borderRadius: 4, border: 'none',
              background: active === i ? C.orange : 'rgba(255,255,255,0.3)',
              cursor: 'pointer', transition: 'all 0.3s ease', padding: 0,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes auFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          [data-watermark] { display: none !important; }
          .stat-divider { display: none !important; }
        }
      `}</style>
    </section>
  );
}