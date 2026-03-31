import { useRef, useState, useEffect } from 'react';
import { C, FD, FB } from '../theme';
import SLabel from './SLabel';
import { useLanguage } from '../i18n';

function useInView(th = 0.12) {
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

function AnimNum({ target, suffix = '' }) {
  const [val, setVal] = useState(0);
  const [ref, visible] = useInView(0.3);
  useEffect(() => {
    if (!visible) return;
    let n = 0; const step = target / 55;
    const t = setInterval(() => {
      n += step;
      if (n >= target) { setVal(target); clearInterval(t); }
      else setVal(Math.floor(n));
    }, 16);
    return () => clearInterval(t);
  }, [visible, target]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

export default function BTPStats() {
  const { t, lang } = useLanguage();
  const [ref, visible] = useInView(0.1);

  const figures = t('parts.components.btpStats.figures') || [];
  const whyItems = t('parts.components.btpStats.whyItems') || [];
  const header = t('parts.components.btpStats.header') || {};

  return (
    <section style={{ background: C.black, padding: '0' }}>

      {/* ── Key Figures bar ── */}
      <div style={{ borderBottom: '1px solid rgba(255,140,30,0.15)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="stats-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' 
          }}>
            {(figures || []).map((fig, i) => (
              <div key={fig.label}
                className="stat-item"
                style={{
                  padding: 'clamp(32px, 5vw, 44px) clamp(20px, 4vw, 36px)',
                  animation: visible ? `btpFadeUp 0.6s ease ${i * 0.1}s both` : 'none',
                  position: 'relative',
                  transition: 'background 0.2s',
                  borderRight: i < figures.length - 1 ? '1px solid rgba(80,80,88,0.4)' : 'none',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,140,30,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: C.orange, transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scaleX(1)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scaleX(0)'} />
                <div style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', marginBottom: 10 }}>{fig.icon}</div>
                <div style={{ 
                  fontFamily: FD, 
                  fontSize: 'clamp(32px, 5vw, 44px)', 
                  fontWeight: 900, 
                  color: C.orange, 
                  lineHeight: 1 
                }}>
                  {fig.valueOverride ?? <AnimNum target={fig.target} suffix={fig.suffix} />}
                </div>
                <div style={{ 
                  fontFamily: FB, 
                  fontSize: 'clamp(10px, 1.2vw, 12px)', 
                  fontWeight: 600, 
                  color: C.white, 
                  marginTop: 8, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.06em' 
                }}>
                  {fig.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Why choose FAMATESS BTP ── */}
      <div ref={ref} style={{ padding: 'clamp(64px, 10vw, 96px) 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px)' }}>
          <div style={{ 
            marginBottom: 'clamp(40px, 6vw, 56px)', 
            animation: visible ? 'btpFadeUp 0.6s ease both' : 'none' 
          }}>
            <SLabel>{header.label}</SLabel>
            <h2 style={{ 
              fontFamily: FD, 
              fontSize: 'clamp(32px, 6vw, 48px)', 
              fontWeight: 700, 
              color: C.white, 
              lineHeight: 1.08 
            }}>
              {header.title}
            </h2>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: 16 
          }}>
            {(whyItems || []).map((item, i) => (
              <div key={item.title}
                style={{
                  background: C.charcoal,
                  border: '1px solid rgba(80,80,88,0.4)',
                  borderTop: `4px solid ${C.orange}`,
                  borderRadius: 4, padding: '28px 24px',
                  transition: 'all 0.25s', cursor: 'default',
                  animation: visible ? `btpFadeUp 0.6s ease ${i * 0.1}s both` : 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = C.orange; e.currentTarget.style.boxShadow = '0 14px 40px rgba(0,0,0,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(80,80,88,0.4)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ fontSize: 'clamp(28px, 3.5vw, 32px)', marginBottom: 14 }}>{item.icon}</div>
                <h4 style={{ 
                  fontFamily: FD, 
                  fontSize: 'clamp(16px, 2vw, 17px)', 
                  fontWeight: 700, 
                  color: C.white, 
                  marginBottom: 10, 
                  lineHeight: 1.3 
                }}>{item.title}</h4>
                <p style={{ 
                  fontFamily: FB, 
                  fontSize: 'clamp(12px, 1.5vw, 13px)', 
                  fontWeight: 300, 
                  color: C.graphite, 
                  lineHeight: 1.75 
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes btpFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .stat-item {
            border-right: none !important;
            border-bottom: 1px solid rgba(80,80,88,0.4);
          }
          .stat-item:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </section>
  );
}