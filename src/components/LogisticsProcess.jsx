import { useRef, useState, useEffect } from 'react';
import { C, FD, FB } from '../theme';
import SLabel from './SLabel';
import { useLanguage } from '../i18n';

function useInView(th = 0.08) {
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

export default function LogisticsProcess() {
  const { t } = useLanguage();
  const [ref, visible] = useInView(0.08);

  const steps = t('parts.components.logisticsProcess.steps', { returnObjects: true }) || [];

  return (
    <section className="process-section" style={{
      background: C.orangeCream,
      borderTop: `1px solid ${C.borderLight}`,
    }}>
      <div className="process-container" style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Header */}
        <div ref={ref} className="process-header" style={{ animation: visible ? 'lgFadeUp 0.6s ease both' : 'none' }}>
          <SLabel>{t('parts.components.logisticsProcess.header.label')}</SLabel>
          <div className="header-grid" style={{ display: 'grid', alignItems: 'flex-start' }}>
            <h2 className="process-title" style={{ fontFamily: FD, fontWeight: 700, color: C.textBody, lineHeight: 1.08 }}>
              {t('parts.components.logisticsProcess.header.line1')}
              <br />
              <em style={{ color: C.orange, fontStyle: 'italic' }}>
                {t('parts.components.logisticsProcess.header.line2')}
              </em>
            </h2>
            <p className="process-desc" style={{
              fontFamily: FB, fontSize: 15, fontWeight: 400,
              color: C.textMuted, lineHeight: 1.85,
            }}>
              {t('parts.components.logisticsProcess.header.desc')}
            </p>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="steps-grid" style={{ display: 'grid', gap: 20 }}>
          {steps.map((step, i) => (
            <div key={step.num}
              style={{
                background: C.white,
                border: `1px solid ${C.borderLight}`,
                borderTop: `4px solid ${C.orange}`,
                borderRadius: 4, padding: '28px 26px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                transition: 'all 0.25s', cursor: 'default',
                animation: visible ? `lgFadeUp 0.55s ease ${i * 0.08}s both` : 'none',
              }}
              onMouseEnter={e => { 
                if (window.innerWidth > 1024) {
                  e.currentTarget.style.transform = 'translateY(-5px)'; 
                  e.currentTarget.style.boxShadow = '0 14px 36px rgba(255,140,30,0.09)'; 
                  e.currentTarget.style.borderColor = C.orange; 
                }
              }}
              onMouseLeave={e => { 
                e.currentTarget.style.transform = 'translateY(0)'; 
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)'; 
                e.currentTarget.style.borderColor = C.borderLight; 
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{
                  fontFamily: FD, fontSize: 38, fontWeight: 900,
                  color: 'rgba(255,140,30,0.18)', lineHeight: 1,
                }}>
                  {step.num}
                </div>
                <div style={{
                  width: 44, height: 44,
                  background: 'rgba(255,140,30,0.1)',
                  border: '1.5px solid rgba(255,140,30,0.25)',
                  borderRadius: 3,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20,
                }}>
                  {step.icon}
                </div>
              </div>
              <h3 style={{
                fontFamily: FD, fontSize: 18, fontWeight: 700,
                color: C.textBody, marginBottom: 10, lineHeight: 1.2,
              }}>
                {step.title}
              </h3>
              <p style={{
                fontFamily: FB, fontSize: 13, fontWeight: 400,
                color: C.textMuted, lineHeight: 1.75,
              }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* Desktop Base */
        .process-section { padding: 96px 0; }
        .process-container { padding: 0 64px; }
        .process-header { margin-bottom: 60px; }
        .header-grid { grid-template-columns: 1fr 1fr; gap: 64px; }
        .process-title { fontSize: 48px; }
        .process-desc { padding-top: 8px; }
        .steps-grid { grid-template-columns: repeat(3, 1fr); }

        @keyframes lgFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Tablet Breakpoint */
        @media (max-width: 1024px) {
          .process-section { padding: 64px 0; }
          .process-container { padding: 0 32px; }
          .header-grid { grid-template-columns: 1fr; gap: 24px; }
          .process-title { fontSize: 36px; }
          .process-desc { padding-top: 0; }
          .steps-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* Mobile Breakpoint */
        @media (max-width: 640px) {
          .process-container { padding: 0 20px; }
          .process-header { margin-bottom: 40px; }
          .process-title { fontSize: 32px; }
          .steps-grid { grid-template-columns: 1fr; gap: 16px; }
        }
      `}</style>
    </section>
  );
}