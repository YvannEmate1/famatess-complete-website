import { useRef, useState, useEffect } from 'react';
import { C, FD, FB } from '../theme';
import SLabel from './SLabel';
import { useLanguage } from '../i18n';

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

export default function BTPProcess() {
  const { t } = useLanguage();
  const [ref, visible] = useInView(0.08);

  const header = t('parts.components.btpProcess.header') || {};
  const steps = t('parts.components.btpProcess.steps') || [];

  // Safe header splitting
  const titleParts = header.title && header.emphasis 
    ? header.title.split(header.emphasis) 
    : [header.title || ''];
  const titleBeforeEmphasis = titleParts[0] || '';
  const safeEmphasis = header.emphasis || '';

  return (
    <section style={{
      background: C.orangeCream,
      padding: 'clamp(64px, 10vw, 96px) 0',
      borderTop: `1px solid ${C.borderLight}`,
    }}>
      <div style={{ 
        maxWidth: 1280, 
        margin: '0 auto', 
        padding: '0 clamp(20px, 5vw, 64px)' 
      }}>

        {/* Header */}
        <div ref={ref} style={{ 
          marginBottom: 'clamp(40px, 6vw, 64px)', 
          animation: visible ? 'btpFadeUp 0.6s ease both' : 'none' 
        }}>
          <SLabel>{header.label || 'How We Work'}</SLabel>
          <div className="process-header-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: 'clamp(24px, 5vw, 64px)', 
            alignItems: 'flex-start' 
          }}>
            <h2 style={{ 
              fontFamily: FD, 
              fontSize: 'clamp(32px, 6vw, 48px)', 
              fontWeight: 700, 
              color: C.textBody, 
              lineHeight: 1.08 
            }}>
              {titleBeforeEmphasis}<br />
              <em style={{ color: C.orange, fontStyle: 'italic' }}>{safeEmphasis}</em>
            </h2>
            <p style={{
              fontFamily: FB, 
              fontSize: 'clamp(14px, 1.8vw, 15px)', 
              fontWeight: 400,
              color: C.textMuted, 
              lineHeight: 1.85, 
              paddingTop: 8,
            }}>
              {header.desc || ''}
            </p>
          </div>
        </div>

        {/* Steps Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: 20 
        }}>
          {Array.isArray(steps) && steps.map((step, i) => (
            <div key={step.num || i}
              style={{
                background: C.white,
                border: `1px solid ${C.borderLight}`,
                borderTop: `4px solid ${C.orange}`,
                borderRadius: 4,
                padding: 'clamp(24px, 3vw, 28px) clamp(20px, 3vw, 26px)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                transition: 'all 0.25s',
                animation: visible ? `btpFadeUp 0.55s ease ${i * 0.08}s both` : 'none',
                cursor: 'default',
              }}
              onMouseEnter={e => { 
                e.currentTarget.style.transform = 'translateY(-5px)'; 
                e.currentTarget.style.boxShadow = '0 14px 36px rgba(255,140,30,0.09)'; 
                e.currentTarget.style.borderColor = C.orange; 
              }}
              onMouseLeave={e => { 
                e.currentTarget.style.transform = 'translateY(0)'; 
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)'; 
                e.currentTarget.style.borderColor = C.borderLight; 
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{
                  fontFamily: FD, 
                  fontSize: 'clamp(32px, 4vw, 38px)', 
                  fontWeight: 900,
                  color: 'rgba(255,140,30,0.18)', 
                  lineHeight: 1,
                }}>
                  {step.num || (i + 1).toString().padStart(2, '0')}
                </div>
                <div style={{
                  width: 44, height: 44,
                  background: 'rgba(255,140,30,0.1)',
                  border: '1.5px solid rgba(255,140,30,0.25)',
                  borderRadius: 3,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20,
                }}>
                  {step.icon || '📋'}
                </div>
              </div>
              <h3 style={{
                fontFamily: FD, 
                fontSize: 'clamp(17px, 2vw, 18px)', 
                fontWeight: 700,
                color: C.textBody, 
                marginBottom: 10, 
                lineHeight: 1.2,
              }}>
                {step.title || 'Step Title'}
              </h3>
              <p style={{
                fontFamily: FB, 
                fontSize: 'clamp(12px, 1.5vw, 13px)', 
                fontWeight: 400,
                color: C.textMuted, 
                lineHeight: 1.75,
              }}>
                {step.desc || 'Step description'}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes btpFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .process-header-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}