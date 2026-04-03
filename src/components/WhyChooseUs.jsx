import { C, FD, FB } from '../theme';
import SLabel from './SLabel';
import useInView from '../utils/useInView';
import { useLanguage } from '../i18n';
import { useEffect, useState } from 'react';

function WhyChooseUs() {
  const { t } = useLanguage();
  const [ref, visible] = useInView(0.08);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const reasonsRaw = t('parts.components.whyChooseUs.reasons', { returnObjects: true });
  const REASONS = Array.isArray(reasonsRaw) ? reasonsRaw : [];

  return (
    <section ref={ref} style={{ 
      background: C.pageBg, 
      padding: isMobile ? "64px 0" : "96px 0",
      overflow: "hidden" 
    }}>
      <div style={{ 
        maxWidth: 1280, 
        margin: "0 auto", 
        padding: isMobile ? "0 24px" : "0 64px" 
      }}>

        {/* Header */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 32 : 80,
          alignItems: "flex-start",
          marginBottom: isMobile ? 40 : 56
        }}>
          <div style={{ animation: visible ? "fadeUp 0.6s ease both" : "none" }}>
            <SLabel>{t('parts.components.whyChooseUs.header.label')}</SLabel>
            <h2 style={{
              fontFamily: FD,
              fontSize: isMobile ? 36 : 48,
              fontWeight: 700,
              color: C.textBody,
              lineHeight: 1.08,
              marginTop: 12
            }}>
              {t('parts.components.whyChooseUs.header.line1')}<br />
              <em style={{ color: C.orange, fontStyle: "italic" }}>
                {t('parts.components.whyChooseUs.header.line2')}
              </em>
            </h2>
          </div>

          <div style={{
            animation: visible ? "fadeUp 0.6s ease 0.1s both" : "none",
            paddingTop: isMobile ? 0 : 8
          }}>
            <p style={{
              fontFamily: FB,
              fontSize: 15,
              color: C.textMuted,
              lineHeight: 1.85,
              maxWidth: 500
            }}>
              {t('parts.components.whyChooseUs.header.desc')}
            </p>
          </div>
        </div>

        {/* Reasons */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {REASONS.map((r, i) => (
            <div
              key={r.num || i}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "50px 1fr" : "72px 1fr auto",
                alignItems: isMobile ? "start" : "center",
                gap: isMobile ? "16px 20px" : 28,
                padding: isMobile ? "24px 20px" : "26px 28px",
                background: C.cardBg,
                border: `1px solid ${C.borderLight}`,
                borderTop: i === 0 ? `1px solid ${C.borderLight}` : "none",
                animation: visible ? `fadeUp 0.55s ease ${i * 0.09}s both` : "none",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
              }}
            >
              {/* Orange bar */}
              <div style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 3,
                background: C.orange
              }} />

              {/* Number */}
              <div style={{
                width: isMobile ? 44 : 50,
                height: isMobile ? 44 : 50,
                borderRadius: 3,
                background: "rgba(255,140,30,0.08)",
                border: "1.5px solid rgba(255,140,30,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: FD,
                fontSize: isMobile ? 18 : 20,
                fontWeight: 900,
                color: C.orange,
                gridRow: isMobile ? "span 2" : "auto"
              }}>
                {r.num}
              </div>

              {/* Text Content */}
              <div style={{ gridColumn: isMobile ? "2 / 3" : "auto" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 6
                }}>
                  <span style={{ fontSize: 18 }}>{r.icon}</span>
                  <h3 style={{
                    fontFamily: FB,
                    fontSize: 16,
                    fontWeight: 700,
                    color: C.textBody,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em"
                  }}>
                    {r.title}
                  </h3>
                </div>

                <p style={{
                  fontFamily: FB,
                  fontSize: 14,
                  color: C.textMuted,
                  lineHeight: 1.75,
                  maxWidth: 640
                }}>
                  {r.desc}
                </p>
              </div>

              {/* Arrow - Hidden on very small screens to save space, or kept at end */}
              {!isMobile && (
                <div style={{
                  color: C.orange,
                  fontSize: 22,
                  opacity: 0.5
                }}>
                  →
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;