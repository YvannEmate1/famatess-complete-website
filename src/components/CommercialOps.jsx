import { C, FD, FB } from '../theme';
import SLabel from './SLabel';
import useInView from '../utils/useInView';
import { useLanguage } from '../i18n';
import { useEffect, useState } from 'react';

function CommercialOps() {
  const [ref, visible] = useInView(0.08);
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const statsRaw = t("parts.components.commercialOps.stats", { returnObjects: true });
  const operationsRaw = t("parts.components.commercialOps.operations", { returnObjects: true });

  const stats = Array.isArray(statsRaw) ? statsRaw : [];
  const operations = Array.isArray(operationsRaw) ? operationsRaw : [];

  return (
    <section
      ref={ref}
      style={{
        background: C.sectionAlt,
        padding: isMobile ? "64px 0" : "96px 0",
        position: "relative",
        overflow: "hidden",
        borderTop: `1px solid ${C.borderLight}`
      }}
    >
      {/* Background rings - adjusted for mobile */}
      <div style={{
        position: "absolute",
        right: isMobile ? -150 : -100,
        top: "50%",
        transform: "translateY(-50%)",
        width: isMobile ? 300 : 500,
        height: isMobile ? 300 : 500,
        borderRadius: "50%",
        border: "1px solid rgba(255,140,30,0.12)",
        pointerEvents: 'none'
      }} />

      <div style={{
        position: "absolute",
        right: isMobile ? -80 : -40,
        top: "50%",
        transform: "translateY(-50%)",
        width: isMobile ? 200 : 340,
        height: isMobile ? 200 : 340,
        borderRadius: "50%",
        border: "1px solid rgba(255,140,30,0.18)",
        pointerEvents: 'none'
      }} />

      <div style={{ 
        maxWidth: 1280, 
        margin: "0 auto", 
        padding: isMobile ? "0 24px" : "0 64px",
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1.1fr", 
          gap: isMobile ? 48 : 80, 
          alignItems: "center" 
        }}>

          {/* LEFT CONTENT */}
          <div style={{ animation: visible ? "fadeUp 0.7s ease both" : "none" }}>
            <SLabel>{t("parts.components.commercialOps.label")}</SLabel>

            <h2 style={{
              fontFamily: FD,
              fontSize: 'clamp(32px, 5vw, 44px)',
              fontWeight: 700,
              color: C.textBody,
              lineHeight: 1.1,
              marginTop: 12,
              marginBottom: 20
            }}>
              {t("parts.components.commercialOps.title")}<br />
              <em style={{ color: C.orange, fontStyle: "italic" }}>
                {t("parts.components.commercialOps.highlight")}
              </em>
            </h2>

            <p style={{
              fontFamily: FB,
              fontSize: 'clamp(14px, 2vw, 15px)',
              color: C.textMuted,
              lineHeight: 1.85,
              marginBottom: 36,
              maxWidth: 540
            }}>
              {t("parts.components.commercialOps.desc")}
            </p>

            {/* STATS GRID */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "1fr 1fr", 
              gap: isMobile ? 12 : 14 
            }}>
              {stats.map((s, i) => (
                <div key={i}
                  style={{
                    background: C.white,
                    border: `1px solid ${C.borderLight}`,
                    borderLeft: `4px solid ${C.orange}`,
                    padding: isMobile ? "14px 16px" : "16px 18px",
                    borderRadius: 3,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: isMobile ? 14 : 16 }}>{s.icon}</span>
                    <span style={{
                      fontFamily: FD,
                      fontSize: isMobile ? 20 : 24,
                      fontWeight: 900,
                      color: C.orange
                    }}>
                      {s.val}
                    </span>
                  </div>

                  <div style={{
                    fontFamily: FB,
                    fontSize: isMobile ? 9 : 11,
                    color: C.textMuted,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontWeight: 600
                  }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT OPERATIONS LIST */}
          <div style={{ animation: visible ? "fadeUp 0.7s ease 0.12s both" : "none" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {operations.map((op, i) => (
                <div key={op.num || i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? 14 : 18,
                    padding: isMobile ? "14px 18px" : "18px 22px",
                    background: i % 2 === 0 ? C.white : C.cardBg,
                    border: `1px solid ${C.borderLight}`,
                    borderTop: i === 0 ? `1px solid ${C.borderLight}` : "none",
                    animation: visible ? `fadeUp 0.55s ease ${i * 0.08}s both` : "none",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.03)"
                  }}
                >
                  {/* Number */}
                  <div style={{
                    width: isMobile ? 32 : 38,
                    height: isMobile ? 32 : 38,
                    borderRadius: "50%",
                    border: `2px solid rgba(255,140,30,0.4)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: FD,
                    fontSize: isMobile ? 12 : 14,
                    fontWeight: 900,
                    color: C.orange,
                    flexShrink: 0
                  }}>
                    {op.num}
                  </div>

                  {/* Icon */}
                  <span style={{ fontSize: isMobile ? 18 : 20 }}>{op.icon}</span>

                  {/* Title */}
                  <span style={{
                    fontFamily: FB,
                    fontSize: isMobile ? 12 : 14,
                    fontWeight: 600,
                    color: C.textBody,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em"
                  }}>
                    {op.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

export default CommercialOps;