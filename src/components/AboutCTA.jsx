import { useState, useRef, useEffect } from 'react';
import { C, FD, FB } from '../theme';

function useInView(th = 0.2) {
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

/* ─────────────────────────────────────────────
   AboutCTA
   src/components/AboutCTA.jsx
───────────────────────────────────────────── */
export default function AboutCTA() {
  const [ref, visible] = useInView(0.2);

  return (
    <section ref={ref} style={{
      background: C.orange,
      padding: '80px 0',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Ghost watermark */}
      <div style={{
        position: 'absolute', right: -40, top: '50%', transform: 'translateY(-50%)',
        fontFamily: FD, fontSize: 200, fontWeight: 900,
        color: 'rgba(180,70,0,0.11)', lineHeight: 1,
        userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>
        FAMATESS
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

          {/* Left — headline */}
          <div style={{ animation: visible ? 'auFadeUp 0.7s ease both' : 'none' }}>
            <h2 style={{
              fontFamily: FD, fontSize: 50, fontWeight: 900,
              color: C.black, lineHeight: 1.0, marginBottom: 16,
            }}>
              Ready to work<br />with us?
            </h2>
            <p style={{
              fontFamily: FB, fontSize: 16, color: 'rgba(18,18,20,0.62)',
              lineHeight: 1.78, maxWidth: 420, marginBottom: 28,
            }}>
              Whether you need a vehicle, a construction project, logistics support
              or earthworks — FAMATESS COMPANY has the expertise and the equipment
              to get the job done.
            </p>

            {/* Contact links */}
            <div style={{ display: 'flex', gap: 14 }}>
              {[
                { label: '📞 Call us',     href: 'tel:+237691455677' },
                { label: '💬 WhatsApp',    href: 'https://wa.me/237671893467' },
              ].map(btn => (
                <a key={btn.label} href={btn.href}
                  style={{
                    fontFamily: FB, fontSize: 13, fontWeight: 700,
                    background: C.black, color: C.white,
                    padding: '12px 22px', borderRadius: 3,
                    textDecoration: 'none', letterSpacing: '0.04em',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = C.charcoal}
                  onMouseLeave={e => e.currentTarget.style.background = C.black}
                >
                  {btn.label}
                </a>
              ))}
            </div>

            {/* Info */}
            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { icon: '📍', text: 'Yaoundé-Ekoumdoum, next to Hôtel Iris — Yaoundé, Cameroon' },
                { icon: '✉️', text: 'famatesscompanysa@gmail.com' },
                { icon: '⏰', text: 'Monday – Saturday: 8:00 AM – 6:00 PM' },
              ].map(item => (
                <div key={item.text} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  fontFamily: FB, fontSize: 13, color: 'rgba(18,18,20,0.55)',
                }}>
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — activity quick links */}
          <div style={{ animation: visible ? 'auFadeUp 0.7s ease 0.12s both' : 'none' }}>
            <div style={{
              background: C.black, borderRadius: 6,
              padding: '28px 26px',
              border: '1px solid rgba(255,140,30,0.2)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
            }}>
              <div style={{ fontFamily: FD, fontSize: 18, fontWeight: 700, color: C.white, marginBottom: 20 }}>
                Our divisions
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { icon: '🚗', label: 'Vehicle Sales',              sub: 'New & used — Toyota, Isuzu, Yamaha & more', color: C.orange },
                  { icon: '🏗️', label: 'Building & Public Works',    sub: 'Housing, roads, civil engineering',          color: C.blue },
                  { icon: '🚛', label: 'Logistics & Transport',      sub: 'Import/export, haulage, warehousing',         color: C.green },
                  { icon: '⛏️', label: 'Earthworks',                 sub: 'Excavation, grading, site preparation',      color: C.yellow },
                ].map((div, i, arr) => (
                  <div key={div.label}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '14px 0',
                      borderBottom: i < arr.length - 1 ? '1px solid rgba(80,80,88,0.3)' : 'none',
                      cursor: 'pointer', transition: 'all 0.18s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.paddingLeft = '6px'}
                    onMouseLeave={e => e.currentTarget.style.paddingLeft = '0px'}
                  >
                    <div style={{
                      width: 38, height: 38, flexShrink: 0,
                      background: `${div.color}18`,
                      border: `1.5px solid ${div.color}30`,
                      borderRadius: 3,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18,
                    }}>
                      {div.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: FB, fontSize: 13, fontWeight: 600, color: C.white }}>{div.label}</div>
                      <div style={{ fontFamily: FB, fontSize: 11, color: C.graphite, marginTop: 2 }}>{div.sub}</div>
                    </div>
                    <span style={{ color: div.color, fontSize: 14, flexShrink: 0 }}>→</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes auFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
