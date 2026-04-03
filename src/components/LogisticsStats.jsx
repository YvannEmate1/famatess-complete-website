import React, { useRef, useState, useEffect } from 'react';
import { C, FD, FB } from '../theme';
import { useLanguage } from '../i18n';
import SLabel from './SLabel';

function useInView(th = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } },
      { threshold: th }
    );
    obs.observe(element);
    return () => obs.disconnect();
  }, [th]);
  return [ref, v];
}

function AnimNum({ target, suffix = '', valueOverride = null }) {
  const [val, setVal] = useState(0);
  const [ref, visible] = useInView(0.3);

  useEffect(() => {
    if (!visible || valueOverride) return;
    let n = 0; 
    const step = (target || 0) / 55;
    const t = setInterval(() => {
      n += step;
      if (n >= target) { 
        setVal(target); 
        clearInterval(t); 
      } else {
        setVal(Math.floor(n));
      }
    }, 16);
    return () => clearInterval(t);
  }, [visible, target, valueOverride]);

  return (
    <span ref={ref}>
      {valueOverride ? valueOverride : `${val.toLocaleString()}${suffix}`}
    </span>
  );
}

/* ─────────────────────────────────────────────
   LogisticsStats
───────────────────────────────────────────── */
export default function LogisticsStats() {
  const { t } = useLanguage();
  const [ref, visible] = useInView(0.1);

  const label = t('parts.components.logisticsStats.header.label');
  const line1 = t('parts.components.logisticsStats.header.line1');
  const line2 = t('parts.components.logisticsStats.header.line2');
  
  const figures = t('parts.components.logisticsStats.figures') || [];
  const whyItems = t('parts.components.logisticsStats.whyItems') || [];

  return (
    <section className="stats-section" style={{ background: C.black, overflow: 'hidden' }}>
      <div className="stats-container" style={{ maxWidth: 1280, margin: '0 auto' }}>
        
        <div className="main-stats-grid" style={{ display: 'grid', alignItems: 'center' }}>
          
          {/* Left: Stats Grid */}
          <div className="figures-grid" style={{ 
            display: 'grid', 
            animation: visible ? 'lgFadeUp 0.8s ease both' : 'none'
          }}>
            {figures.map((fig, i) => (
              <div 
                key={i}
                className="stat-card"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(80,80,88,0.3)',
                  borderRadius: 4,
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>{fig.icon}</div>
                <div className="stat-number" style={{ fontFamily: FD, fontWeight: 900, color: C.orange, lineHeight: 1, marginBottom: 8 }}>
                  <AnimNum 
                    target={fig.target} 
                    suffix={fig.suffix} 
                    valueOverride={fig.valueOverride} 
                  />
                </div>
                <div style={{ fontFamily: FB, fontSize: 11, fontWeight: 600, color: C.graphite, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {fig.label}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Content */}
          <div ref={ref} className="content-side">
            <SLabel>{label}</SLabel>
            <h2 className="stats-title" style={{ 
              fontFamily: FD, fontWeight: 700, color: C.white, 
              lineHeight: 1.1, marginTop: 12 
            }}>
              {line1}<br />
              <em style={{ color: C.orange, fontStyle: 'italic' }}>{line2}</em>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {whyItems.map((item, i) => (
                <div 
                  key={i}
                  style={{
                    background: C.charcoal,
                    border: '1px solid rgba(80,80,88,0.4)',
                    borderTop: `4px solid ${C.orange}`,
                    borderRadius: 4, padding: '28px 24px',
                    transition: 'all 0.25s', cursor: 'default',
                    animation: visible ? `lgFadeUp 0.6s ease ${i * 0.1}s both` : 'none',
                  }}
                  onMouseEnter={e => { 
                    if (window.innerWidth > 1024) {
                      e.currentTarget.style.transform = 'translateY(-5px)'; 
                      e.currentTarget.style.borderColor = C.orange; 
                      e.currentTarget.style.boxShadow = '0 14px 40px rgba(0,0,0,0.2)'; 
                    }
                  }}
                  onMouseLeave={e => { 
                    e.currentTarget.style.transform = 'translateY(0)'; 
                    e.currentTarget.style.borderColor = 'rgba(80,80,88,0.4)'; 
                    e.currentTarget.style.boxShadow = 'none'; 
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{item.icon}</div>
                  <h4 style={{ fontFamily: FD, fontSize: 17, fontWeight: 700, color: C.white, marginBottom: 10, lineHeight: 1.3 }}>
                    {item.title}
                  </h4>
                  <p style={{ fontFamily: FB, fontSize: 13, fontWeight: 300, color: C.graphite, lineHeight: 1.75 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        /* Base / Desktop Styles */
        .stats-section { padding: 100px 0; }
        .stats-container { padding: 0 64px; }
        .main-stats-grid { grid-template-columns: 1.1fr 1fr; gap: 80px; }
        .figures-grid { grid-template-columns: 1fr 1fr; gap: 24px; }
        .stat-card { padding: 40px 32px; }
        .stat-number { fontSize: 44px; }
        .stats-title { fontSize: 48px; margin-bottom: 32px; }

        @keyframes lgFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Tablet Breakpoint */
        @media (max-width: 1024px) {
          .stats-section { padding: 64px 0; }
          .stats-container { padding: 0 32px; }
          .main-stats-grid { 
            grid-template-columns: 1fr; 
            gap: 64px; 
          }
          .stats-title { fontSize: 36px; }
          /* Move the content above the stats or below? Keeping content below stats as per current DOM order */
          .content-side { order: -1; text-align: center; }
          .content-side > div { align-items: center; } /* For SLabel alignment if it uses flex */
        }

        /* Mobile Breakpoint */
        @media (max-width: 640px) {
          .stats-container { padding: 0 20px; }
          .figures-grid { 
            grid-template-columns: 1fr; 
            gap: 16px; 
          }
          .stat-card { padding: 32px 20px; }
          .stats-title { fontSize: 32px; }
          .stat-number { fontSize: 38px; }
        }
      `}</style>
    </section>
  );
}