import { C, FD, FB } from '../theme';
import useInView from '../utils/useInView';
import SLabel from './SLabel';
import { useLanguage } from '../i18n';
import { useEffect, useState } from 'react';

function WhyFamatess() {
  const [ref, visible] = useInView(0.1);
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ✅ SAFE TEXT FUNCTION
  const safeT = (key, fallback = '') => {
    const val = t(key);
    return (!val || val === key) ? fallback : val;
  };

  // ✅ CORRECT PATH
  const label = safeT('parts.components.whyFamatess.label', 'FAMATESS COMPANY');
  const line1 = safeT('parts.components.whyFamatess.header.line1', 'The right service');
  const line2 = safeT('parts.components.whyFamatess.header.line2', 'at the best price.');

  // ✅ SAFE ARRAY FETCH
  const rawPoints = t('parts.components.whyFamatess.points', { returnObjects: true });
  const points = Array.isArray(rawPoints) ? rawPoints : [];

  return (
    <section
      ref={ref}
      style={{
        background: C.orangeCream,
        padding: isMobile ? "64px 0" : "88px 0",
        borderTop: `1px solid ${C.borderLight}`,
        overflow: "hidden"
      }}
    >
      <style>{`
        .why-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.08) !important;
          border-color: ${C.orange} !important;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ 
        maxWidth: 1280, 
        margin: "0 auto", 
        padding: '0 clamp(20px, 5vw, 64px)' 
      }}>
        
        {/* Header Section */}
        <div style={{ 
          textAlign: "center", 
          marginBottom: isMobile ? 40 : 56,
          animation: visible ? "fadeUp 0.6s ease both" : "none" 
        }}>
          <SLabel>{label}</SLabel>
          <h2
            style={{
              fontFamily: FD,
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              color: C.textBody,
              lineHeight: 1.1,
              marginTop: 12
            }}
          >
            {line1}
            <br />
            <em style={{ color: C.orange, fontStyle: "italic" }}>
              {line2}
            </em>
          </h2>
        </div>

        {/* Responsive Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile 
              ? "1fr" 
              : isTablet 
                ? "repeat(2, 1fr)" 
                : "repeat(4, 1fr)",
            gap: isMobile ? 16 : 20
          }}
        >
          {points.map((p, i) => (
            <div
              key={p.title || i}
              className="why-card"
              style={{
                background: C.white,
                border: `1px solid ${C.borderLight}`,
                borderTop: `4px solid ${C.orange}`,
                borderRadius: 4,
                padding: isMobile ? "24px 20px" : "28px 24px",
                animation: visible ? `fadeUp 0.6s ease ${i * 0.1}s both` : "none",
                transition: "all 0.25s",
                boxShadow: "0 2px 10px rgba(0,0,0,0.04)"
              }}
            >
              <div style={{ fontSize: isMobile ? 28 : 34, marginBottom: 14 }}>
                {p.icon}
              </div>

              <h4
                style={{
                  fontFamily: FD,
                  fontSize: 17,
                  fontWeight: 700,
                  color: C.textBody,
                  marginBottom: 10,
                  lineHeight: 1.3
                }}
              >
                {p.title}
              </h4>

              <p
                style={{
                  fontFamily: FB,
                  fontSize: 13,
                  fontWeight: 400,
                  color: C.textMuted,
                  lineHeight: 1.75
                }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyFamatess;