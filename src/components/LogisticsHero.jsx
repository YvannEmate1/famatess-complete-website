import React from 'react';
import { C, FD, FB } from '../theme';
import { useLanguage } from '../i18n';
import SLabel from './SLabel';

/* ─────────────────────────────────────────────
   LogisticsHero — fully responsive
   src/components/LogisticsHero.jsx
───────────────────────────────────────────── */
export default function LogisticsHero() {
  const { t } = useLanguage();

  // Pull data from translation.json
  const breadcrumbs = t('parts.components.logisticsHero.breadcrumb') || [];
  const label = t('parts.components.logisticsHero.label');
  const headlineBefore = t('parts.components.logisticsHero.headlineBefore');
  const headlineEmphasis = t('parts.components.logisticsHero.headlineEmphasis');
  const description = t('parts.components.logisticsHero.description');
  const watermark = t('parts.components.logisticsHero.watermark');
  const stats = t('parts.components.logisticsHero.stats') || [];

  return (
    <section style={{
      background: C.black,
      position: 'relative',
      overflow: 'hidden',
      padding: 'clamp(48px, 8vw, 80px) 0 clamp(44px, 7vw, 72px)',
    }}>

      {/* ── decorative layers ── */}
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
      <div style={{
        position: 'absolute', left: 'clamp(20px, 5vw, 64px)', top: 0, bottom: 0, width: 1,
        background: 'linear-gradient(to bottom, transparent, rgba(255,140,30,0.3), transparent)',
      }} />

      {/* ── ghost watermark ── */}
      <div 
        data-watermark
        style={{
          position: 'absolute', right: 40, top: '50%', transform: 'translateY(-52%)',
          fontFamily: FD, fontSize: 'clamp(80px, 12vw, 160px)', fontWeight: 900,
          color: 'rgba(255,140,30,0.04)', lineHeight: 1,
          userSelect: 'none', pointerEvents: 'none',
          letterSpacing: '-0.02em', whiteSpace: 'nowrap',
        }}
      >
        {watermark}
      </div>

      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 64px)',
        position: 'relative',
        zIndex: 2,
      }}>

        {/* ── breadcrumb ── */}
        <div style={{
          display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8,
          fontFamily: FB, fontSize: 'clamp(11px, 1.5vw, 12px)', color: C.graphite, 
          marginBottom: 'clamp(24px, 4vw, 36px)',
        }}>
          {breadcrumbs.map((crumb, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                color: i === breadcrumbs.length - 1 ? C.orange : C.graphite,
              }}>
                {crumb}
              </span>
              {i < breadcrumbs.length - 1 && <span>›</span>}
            </span>
          ))}
        </div>

        {/* ── main text ── */}
        <div style={{ animation: 'lgFadeUp 0.6s ease both' }}>
          <SLabel>{label}</SLabel>
          <h1 style={{
            fontFamily: FD,
            fontSize: 'clamp(36px, 5.8vw, 84px)',
            fontWeight: 900,
            color: C.white,
            lineHeight: 0.97,
            marginBottom: 'clamp(16px, 3vw, 22px)',
          }}>
            {headlineBefore}<br />
            <em style={{ color: C.orange, fontStyle: 'italic' }}>{headlineEmphasis}</em>
          </h1>
          <p style={{
            fontFamily: FB,
            fontSize: 'clamp(14px, 2vw, 16px)',
            fontWeight: 300,
            color: C.graphite,
            maxWidth: 580,
            lineHeight: 1.8,
          }}>
            {description}
          </p>
        </div>

        {/* ── stat strip ── */}
        {stats.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            marginTop: 'clamp(32px, 5vw, 48px)', 
            paddingTop: 'clamp(20px, 4vw, 32px)',
            borderTop: '1px solid rgba(80,80,88,0.35)',
            animation: 'lgFadeUp 0.6s ease 0.15s both',
          }}>
            {stats.map(([num, label], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  paddingLeft: i === 0 ? 0 : 'clamp(16px, 3vw, 32px)', 
                  paddingRight: 'clamp(16px, 3vw, 32px)',
                  paddingBottom: 8 
                }}>
                  <div style={{ 
                    fontFamily: FD, 
                    fontSize: 'clamp(22px, 3vw, 28px)', 
                    fontWeight: 900, 
                    color: C.orange, 
                    lineHeight: 1 
                  }}>
                    {num}
                  </div>
                  <div style={{ 
                    fontFamily: FB, 
                    fontSize: 'clamp(9px, 1.2vw, 10px)', 
                    color: C.graphite, 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.1em', 
                    marginTop: 4 
                  }}>
                    {label}
                  </div>
                </div>

                {/* divider — hidden after last item AND when rows wrap */}
                {i < stats.length - 1 && (
                  <div style={{ width: 1, height: 36, background: 'rgba(80,80,88,0.4)', flexShrink: 0 }} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes lgFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* hide watermark on small screens to avoid overflow */
        @media (max-width: 640px) {
          [data-watermark] { display: none !important; }
        }
      `}</style>
    </section>
  );
}