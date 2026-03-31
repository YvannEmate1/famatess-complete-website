import { C, FD, FB } from '../theme';
import SLabel from './SLabel';
import { useLanguage } from '../i18n';

function HeroBanner() {
  const { t } = useLanguage();

  const breadcrumbRaw = t("parts.components.heroChooseUs.breadcrumb", { returnObjects: true });
  const breadcrumb = Array.isArray(breadcrumbRaw) ? breadcrumbRaw : [];

  const statsRaw = t("parts.components.heroChooseUs.stats", { returnObjects: true });
  const stats = Array.isArray(statsRaw) ? statsRaw : [];

  return (
    <section style={{ 
      background: C.black, 
      position: "relative", 
      overflow: "hidden", 
      padding: 'clamp(48px, 8vw, 80px) 0 clamp(44px, 7vw, 72px)' 
    }}>
      
      {/* Background Decorations */}
      <div style={{ 
        position: "absolute", 
        top: 0, 
        right: 0, 
        width: "45%", 
        height: "100%", 
        background: "rgba(255,140,30,0.04)", 
        clipPath: "polygon(18% 0,100% 0,100% 100%,0% 100%)",
        pointerEvents: 'none'
      }} />
      
      <div style={{ 
        position: "absolute", 
        bottom: 0, 
        left: 0, 
        right: 0, 
        height: 3, 
        background: `linear-gradient(to right, ${C.orange}, transparent 60%)` 
      }} />

      {/* Watermark Text */}
      <div className="hero-watermark" style={{
        position: 'absolute', 
        right: 40, 
        top: '50%', 
        transform: 'translateY(-52%)',
        fontFamily: FD, 
        fontSize: 'clamp(60px, 12vw, 160px)', 
        fontWeight: 900,
        color: 'rgba(255,140,30,0.04)', 
        lineHeight: 1,
        userSelect: 'none', 
        pointerEvents: 'none',
        letterSpacing: '-0.02em', 
        whiteSpace: 'nowrap',
        zIndex: 1
      }}>
        FAMATESS
      </div>

      <div style={{ 
        maxWidth: 1280, 
        margin: "0 auto", 
        padding: '0 clamp(20px, 5vw, 64px)',
        position: 'relative',
        zIndex: 2
      }}>
        
        {/* Breadcrumb */}
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap",
          gap: 8, 
          fontFamily: FB, 
          fontSize: 'clamp(11px, 1.5vw, 12px)', 
          color: C.graphite, 
          marginBottom: 'clamp(24px, 4vw, 36px)' 
        }}>
          {breadcrumb.map((c, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: i === breadcrumb.length - 1 ? C.orange : C.graphite }}>
                {c}
              </span>
              {i < breadcrumb.length - 1 && <span> › </span>}
            </span>
          ))}
        </div>

        {/* Content */}
        <div style={{ animation: 'heroFadeUp 0.6s ease both' }}>
          <SLabel>{t("parts.components.heroChooseUs.label")}</SLabel>

          <h1 style={{ 
            fontFamily: FD, 
            fontSize: "clamp(38px, 5.8vw, 84px)", 
            color: C.white,
            lineHeight: 1.1,
            marginTop: 16,
            marginBottom: 24,
            fontWeight: 900
          }}>
            {t("parts.components.heroChooseUs.titleLine1")}
            <br />
            <em style={{ color: C.orange, fontStyle: 'italic' }}>
              {t("parts.components.heroChooseUs.titleHighlight")}
            </em>
          </h1>

          <p style={{ 
            fontFamily: FB, 
            fontSize: 'clamp(14px, 2vw, 16px)', 
            color: C.graphite, 
            maxWidth: 580, 
            lineHeight: 1.8 
          }}>
            {t("parts.components.heroChooseUs.description")}
          </p>
        </div>

        {/* Stats Strip - Compact & Responsive */}
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap",
          marginTop: 'clamp(32px, 5vw, 48px)',
          paddingTop: 'clamp(20px, 4vw, 32px)',
          borderTop: '1px solid rgba(80,80,88,0.35)',
          animation: 'heroFadeUp 0.6s ease 0.15s both'
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ 
                paddingLeft: i === 0 ? 0 : 'clamp(12px, 3vw, 32px)',
                paddingRight: 'clamp(12px, 3vw, 32px)',
                paddingBottom: 8
              }}>
                <div style={{ 
                  fontFamily: FD, 
                  fontSize: 'clamp(22px, 3vw, 30px)', 
                  color: C.orange,
                  lineHeight: 1
                }}>
                  {s.value}
                </div>
                <div style={{ 
                  fontFamily: FB, 
                  fontSize: 'clamp(9px, 1.2vw, 11px)',
                  color: C.graphite,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginTop: 4
                }}>
                  {s.label}
                </div>
              </div>

              {/* Divider */}
              {i < stats.length - 1 && (
                <div style={{ 
                  width: 1, 
                  height: 30, 
                  background: 'rgba(80,80,88,0.4)', 
                  flexShrink: 0 
                }} />
              )}
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          .hero-watermark { display: none !important; }
        }
      `}</style>
    </section>
  );
}

export default HeroBanner;