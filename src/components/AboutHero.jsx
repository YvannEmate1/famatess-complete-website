import { C, FD, FB } from '../theme';
import SLabel from './SLabel';
import { useLanguage } from '../i18n';

/* ─────────────────────────────────────────────
   AboutHero — fully responsive
───────────────────────────────────────────── */
export default function AboutHero() {
  const { t } = useLanguage();

  const data       = t('parts.components.aboutHero') || {};
  const breadcrumb = data.breadcrumb || [];
  const stats      = data.stats      || [];

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

      {/* watermark — hidden on small screens */}
      <div style={{
        position: 'absolute', right: 40, top: '50%', transform: 'translateY(-52%)',
        fontFamily: FD, fontSize: 'clamp(60px, 11vw, 140px)', fontWeight: 900,
        color: 'rgba(255,140,30,0.04)', lineHeight: 1,
        userSelect: 'none', pointerEvents: 'none',
        letterSpacing: '-0.02em', whiteSpace: 'nowrap',
        display: 'var(--watermark-display, block)',
      }}>
        {data.watermark || ''}
      </div>

      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 64px)',
      }}>

        {/* breadcrumb */}
        {breadcrumb.length > 0 && (
          <div style={{
            display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8,
            fontFamily: FB, fontSize: 'clamp(11px, 1.5vw, 12px)',
            color: C.graphite, marginBottom: 'clamp(24px, 4vw, 36px)',
          }}>
            {breadcrumb.map((crumb, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    color: i === breadcrumb.length - 1 ? C.orange : C.graphite,
                    cursor: i < breadcrumb.length - 1 ? 'pointer' : 'default',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { if (i < breadcrumb.length - 1) e.currentTarget.style.color = C.orange; }}
                  onMouseLeave={e => { if (i < breadcrumb.length - 1) e.currentTarget.style.color = C.graphite; }}
                >
                  {crumb}
                </span>
                {i < breadcrumb.length - 1 && <span style={{ color: C.graphite }}>›</span>}
              </span>
            ))}
          </div>
        )}

        {/* headline block */}
        <div style={{ animation: 'auFadeUp 0.6s ease both' }}>
          <SLabel>{data.label || ''}</SLabel>

          <h1 style={{
            fontFamily: FD,
            fontSize: 'clamp(36px, 5.8vw, 84px)',
            fontWeight: 900,
            color: C.white,
            lineHeight: 1.0,
            marginBottom: 'clamp(16px, 3vw, 22px)',
          }}>
            {data.titleLine1 || ''}<br />
            <em style={{ color: C.orange, fontStyle: 'italic' }}>
              {data.titleHighlight || ''}
            </em>
          </h1>

          <p style={{
            fontFamily: FB,
            fontSize: 'clamp(14px, 2vw, 16px)',
            fontWeight: 300,
            color: C.graphite,
            maxWidth: 580,
            lineHeight: 1.8,
          }}>
            {data.description || ''}
          </p>
        </div>

        {/* stats strip */}
        {stats.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',           /* wraps on very small screens */
            gap: 'clamp(16px, 3vw, 0px)',
            marginTop: 'clamp(32px, 5vw, 48px)',
            paddingTop: 'clamp(20px, 4vw, 32px)',
            borderTop: '1px solid rgba(80,80,88,0.35)',
            animation: 'auFadeUp 0.6s ease 0.15s both',
          }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  paddingLeft:  i === 0 ? 0 : 'clamp(16px, 3vw, 32px)',
                  paddingRight: 'clamp(16px, 3vw, 32px)',
                  paddingBottom: 8,   /* breathing room when rows wrap */
                }}>
                  <div style={{
                    fontFamily: FD,
                    fontSize: 'clamp(22px, 3vw, 28px)',
                    fontWeight: 900,
                    color: C.orange,
                    lineHeight: 1,
                  }}>
                    {stat?.value || ''}
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

                {/* divider — hidden after last item AND on wrap */}
                {i < stats.length - 1 && (
                  <div style={{ width: 1, height: 36, background: 'rgba(80,80,88,0.4)', flexShrink: 0 }} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes auFadeUp {
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