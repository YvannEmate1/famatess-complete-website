import { C, FD, FB } from '../theme';
import { useLanguage } from '../i18n';

function ActivitiesHeroBanner() {
  const { t } = useLanguage();

  // Safely get breadcrumb and stats as arrays
  const breadcrumb = t("parts.components.activitiesHero.breadcrumb", { returnObjects: true });
  const breadcrumbArray = Array.isArray(breadcrumb) ? breadcrumb : [];

  const stats = t("parts.components.activitiesHero.stats", { returnObjects: true });
  const statsArray = Array.isArray(stats) ? stats : [];

  return (
    <section style={{ 
      background: C.black, 
      position: "relative", 
      overflow: "hidden", 
      padding: 'clamp(48px, 8vw, 80px) 0 clamp(44px, 7vw, 72px)' 
    }}>
      
      {/* Background shapes */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "45%",
          height: "100%",
          background: "rgba(255,140,30,0.04)",
          clipPath: "polygon(18% 0,100% 0,100% 100%,0% 100%)",
          pointerEvents: "none"
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(to right, ${C.orange}, transparent 55%)`
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 'clamp(20px, 5vw, 64px)',
          top: 0,
          bottom: 0,
          width: 1,
          background: "linear-gradient(to bottom, transparent, rgba(255,140,30,0.3), transparent)"
        }}
      />

      {/* Background watermark text — hidden on small screens to avoid overflow */}
      <div className="hero-watermark" style={{
        position: 'absolute',
        right: 40,
        top: "50%",
        transform: "translateY(-52%)",
        fontFamily: FD,
        fontSize: 'clamp(60px, 11vw, 140px)',
        fontWeight: 900,
        color: "rgba(255,140,30,0.04)",
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
        letterSpacing: '-0.02em',
        whiteSpace: 'nowrap',
      }}>
        {t("parts.components.activitiesHero.backgroundText")}
      </div>

      <div style={{ 
        maxWidth: 1280, 
        margin: "0 auto", 
        padding: '0 clamp(20px, 5vw, 64px)',
        position: 'relative',
        zIndex: 2
      }}>
        
        {/* Breadcrumb */}
        {breadcrumbArray.length > 0 && (
          <div style={{ 
            display: "flex", 
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8, 
            fontFamily: FB, 
            fontSize: 'clamp(11px, 1.5vw, 12px)', 
            color: C.graphite, 
            marginBottom: 'clamp(24px, 4vw, 36px)' 
          }}>
            {breadcrumbArray.map((crumb, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: i === breadcrumbArray.length - 1 ? C.orange : C.graphite }}>
                  {crumb}
                </span>
                {i < breadcrumbArray.length - 1 && <span> › </span>}
              </span>
            ))}
          </div>
        )}

        {/* Hero content */}
        <div style={{ animation: 'actFadeUp 0.6s ease both' }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 24, height: 2, background: C.orange }} />
            <span style={{ fontFamily: FB, fontSize: 11, color: C.orange, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {t("parts.components.activitiesHero.label")}
            </span>
          </div>

          <h1 style={{ 
            fontFamily: FD, 
            fontSize: "clamp(36px, 5.8vw, 82px)", 
            color: C.white,
            fontWeight: 900,
            lineHeight: 1.0,
            marginBottom: 'clamp(16px, 3vw, 22px)'
          }}>
            {t("parts.components.activitiesHero.title")}
            <br />
            <em style={{ color: C.orange, fontStyle: 'italic' }}>
              {t("parts.components.activitiesHero.titleHighlight")}
            </em>
          </h1>

          <p style={{ 
            fontFamily: FB, 
            fontSize: 'clamp(14px, 2vw, 16px)', 
            color: C.graphite, 
            fontWeight: 300, 
            maxWidth: 580, 
            lineHeight: 1.8 
          }}>
            {t("parts.components.activitiesHero.description")}
          </p>
        </div>

        {/* Stats Strip */}
        {statsArray.length > 0 && (
          <div style={{ 
            display: "flex", 
            flexWrap: "wrap",
            marginTop: 'clamp(32px, 5vw, 48px)',
            paddingTop: 'clamp(20px, 4vw, 32px)',
            borderTop: '1px solid rgba(80,80,88,0.35)',
            animation: 'actFadeUp 0.6s ease 0.15s both'
          }}>
            {statsArray.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  paddingLeft: i === 0 ? 0 : 'clamp(16px, 3vw, 32px)', 
                  paddingRight: 'clamp(16px, 3vw, 32px)',
                  paddingBottom: 8 
                }}>
                  <div style={{ 
                    fontFamily: FD, 
                    fontSize: 'clamp(22px, 3vw, 32px)', 
                    fontWeight: 900,
                    color: C.orange,
                    lineHeight: 1
                  }}>
                    {item.value}
                  </div>
                  <div style={{ 
                    fontFamily: FB, 
                    fontSize: 'clamp(9px, 1.2vw, 12px)', 
                    color: C.graphite,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginTop: 4
                  }}>
                    {item.label}
                  </div>
                </div>

                {/* Divider */}
                {i < statsArray.length - 1 && (
                  <div style={{ width: 1, height: 36, background: 'rgba(80,80,88,0.4)', flexShrink: 0 }} />
                )}
              </div>
            ))}
          </div>
        )}

      </div>

      <style>{`
        @keyframes actFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          .hero-watermark { display: none !important; }
        }
      `}</style>
    </section>
  );
}

export default ActivitiesHeroBanner;