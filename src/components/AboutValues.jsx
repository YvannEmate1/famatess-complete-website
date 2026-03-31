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
      ([e]) => {
        if (e.isIntersecting) {
          setV(true);
          obs.disconnect();
        }
      },
      { threshold: th }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [th]);

  return [ref, v];
}

// Hook to detect screen width for responsive adjustments
function useWindowSize() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}

/* ─────────────────────────────────────────────
   AboutValues (RESPONSIVE VERSION)
───────────────────────────────────────────── */
export default function AboutValues() {
  const [ref, visible] = useInView(0.08);
  const { t } = useLanguage();
  const width = useWindowSize();

  const data = t('parts.components.aboutValues') || {};
  const items = data.items || [];

  // Responsive Breakpoints
  const isMobile = width <= 768;
  const isTablet = width <= 1024 && width > 768;

  return (
    <section style={{ 
      background: C.orangeCream, 
      padding: isMobile ? '64px 0' : '96px 0', 
      borderTop: `1px solid ${C.borderLight}`,
      overflow: 'hidden' 
    }}>
      <div style={{ 
        maxWidth: 1280, 
        margin: '0 auto', 
        padding: isMobile ? '0 24px' : '0 64px' 
      }}>

        {/* Header */}
        <div
          ref={ref}
          style={{
            marginBottom: isMobile ? 40 : 56,
            animation: visible ? 'auFadeUp 0.6s ease both' : 'none'
          }}
        >
          <SLabel>{data.label || ''}</SLabel>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 24 : 64,
            alignItems: 'flex-start'
          }}>
            <h2 style={{
              fontFamily: FD,
              fontSize: isMobile ? 32 : 46,
              fontWeight: 700,
              color: C.textBody,
              lineHeight: 1.1,
            }}>
              {data.titleLine1 || ''}<br />
              <em style={{ color: C.orange, fontStyle: 'italic' }}>
                {data.titleHighlight || ''}
              </em>
            </h2>

            <p style={{
              fontFamily: FB,
              fontSize: isMobile ? 14 : 15,
              fontWeight: 400,
              color: C.textMuted,
              lineHeight: 1.85,
              paddingTop: isMobile ? 0 : 8,
            }}>
              {data.description || ''}
            </p>
          </div>
        </div>

        {/* Values grid */}
        {items.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : (isTablet ? '1fr 1fr' : 'repeat(3, 1fr)'),
            gap: isMobile ? 16 : 18
          }}>
            {items.map((val, i) => {
              const color = val?.color || [
                C.orange,
                C.blue,
                C.green,
                C.purple,
                C.yellow,
                C.orange
              ][i % 6];

              return (
                <div
                  key={i}
                  style={{
                    background: C.white,
                    border: `1px solid ${C.borderLight}`,
                    borderTop: `4px solid ${color}`,
                    borderRadius: 4,
                    padding: '28px 26px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                    transition: 'all 0.25s',
                    cursor: 'default',
                    animation: visible ? `auFadeUp 0.55s ease ${i * 0.08}s both` : 'none',
                  }}
                  onMouseEnter={e => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = `0 14px 36px rgba(0,0,0,0.09)`;
                      e.currentTarget.style.borderColor = color;
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)';
                      e.currentTarget.style.borderColor = C.borderLight;
                    }
                  }}
                >
                  {/* icon + number */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 16
                  }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      background: `${color}14`,
                      border: `1.5px solid ${color}30`,
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 22,
                    }}>
                      {val?.icon || ''}
                    </div>

                    <span style={{
                      fontFamily: FD,
                      fontSize: 36,
                      fontWeight: 900,
                      color: `${color}20`,
                      lineHeight: 1,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: FD,
                    fontSize: 20,
                    fontWeight: 700,
                    color: C.textBody,
                    marginBottom: 10,
                    lineHeight: 1.2,
                  }}>
                    {val?.title || ''}
                  </h3>

                  <p style={{
                    fontFamily: FB,
                    fontSize: 13,
                    fontWeight: 400,
                    color: C.textMuted,
                    lineHeight: 1.75,
                  }}>
                    {val?.desc || ''}
                  </p>
                </div>
              );
            })}
          </div>
        )}

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