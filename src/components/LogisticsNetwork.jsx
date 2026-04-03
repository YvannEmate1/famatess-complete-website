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

export default function LogisticsNetwork() {
  const { t } = useLanguage();
  const [ref, visible] = useInView(0.08);
  const [hov, setHov] = useState(null);

  // Access translation data
  const data = t('parts.components.logisticsNetwork') || {};
  const regions = data.regions || [];

  // Color mapping for regions (logic remains in JSX for theme consistency)
  const regionColors = [C.orange, C.blue, C.green, C.yellow, C.purple, C.green];

  return (
    <section className="ln-section" style={{
      background: C.charcoal,
      padding: '96px 0',
      borderTop: `1px solid rgba(80,80,88,0.3)`,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative rings */}
      <div className="ln-ring" style={{ position: 'absolute', right: -100, top: '50%', transform: 'translateY(-50%)', width: 520, height: 520, borderRadius: '50%', border: '1px solid rgba(255,140,30,0.07)', pointerEvents: 'none' }} />
      <div className="ln-ring" style={{ position: 'absolute', right: -40, top: '50%', transform: 'translateY(-50%)', width: 360, height: 360, borderRadius: '50%', border: '1px solid rgba(255,140,30,0.1)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 5%' }}>

        {/* Header row */}
        <div ref={ref} className="ln-header" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'flex-end',
          marginBottom: 64, animation: visible ? 'lgFadeUp 0.6s ease both' : 'none',
        }}>
          <div>
            <SLabel>{data.label}</SLabel>
            <h2 className="ln-title" style={{ fontFamily: FD, fontSize: 48, fontWeight: 700, color: C.white, lineHeight: 1.08 }}>
              {data.title}
              <br />
              <em style={{ color: C.orange, fontStyle: 'italic' }}>{data.titleHighlight}</em>
            </h2>
          </div>
          <p style={{
            fontFamily: FB, fontSize: 15, fontWeight: 400,
            color: C.graphite, lineHeight: 1.85, paddingBottom: 4,
          }}>
            {data.description}
          </p>
        </div>

        {/* Region grid */}
        <div className="ln-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {regions.map((r, i) => {
            const rColor = regionColors[i % regionColors.length];
            return (
              <div key={i}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                style={{
                  background: hov === i ? 'rgba(55,55,60,0.9)' : 'rgba(45,45,50,0.6)',
                  border: `1px solid ${hov === i ? rColor : 'rgba(80,80,88,0.35)'}`,
                  borderRadius: 4, padding: '26px 26px',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                  transform: hov === i ? 'translateY(-4px)' : 'none',
                  animation: visible ? `lgFadeUp 0.6s ease ${i * 0.08}s both` : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <span style={{ fontSize: 24 }}>{r.flag}</span>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontFamily: FD, fontSize: 17, fontWeight: 700, color: C.white, lineHeight: 1 }}>{r.region}</h3>
                    <span style={{
                      fontFamily: FB, fontSize: 10, color: rColor,
                      fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                    }}>
                      {r.role}
                    </span>
                  </div>
                  <div style={{ background: `${rColor}20`, border: `1px solid ${rColor}40`, color: rColor, fontFamily: FD, fontSize: 14, fontWeight: 700, padding: '4px 10px', borderRadius: 2 }}>
                    {r.services?.length || 0}
                  </div>
                </div>

                <p style={{
                  fontFamily: FB, fontSize: 13, color: C.graphite,
                  lineHeight: 1.7, marginBottom: 14,
                }}>
                  {r.desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {r.services?.map(s => (
                    <span key={s} style={{
                      fontFamily: FB, fontSize: 11, fontWeight: 500,
                      color: hov === i ? rColor : C.graphite,
                      background: 'rgba(80,80,88,0.2)',
                      border: `1px solid ${hov === i ? rColor + '40' : 'rgba(80,80,88,0.4)'}`,
                      padding: '3px 10px', borderRadius: 2,
                      transition: 'all 0.2s',
                    }}>
                      {s}
                    </span>
                  ))}
                </div>

                {hov === i && (
                  <div style={{
                    marginTop: 14, display: 'flex', alignItems: 'center', gap: 6,
                    fontFamily: FB, fontSize: 12, fontWeight: 600,
                    color: rColor, letterSpacing: '0.06em',
                  }}>
                    {data.viewHub}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes lgFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          .ln-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (max-width: 768px) {
          .ln-section { padding: 64px 0 !important; }
          .ln-header { grid-template-columns: 1fr !important; gap: 24px !important; margin-bottom: 40px !important; }
          .ln-title { font-size: 36px !important; }
          .ln-ring { display: none; }
        }

        @media (max-width: 600px) {
          .ln-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}