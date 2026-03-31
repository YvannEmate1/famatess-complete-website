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

// Hook to detect screen width for responsive layout adjustments
function useWindowSize() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}

/* ── Core activity card ── */
function CoreCard({ item, index, visible, learnMore, isMobile }) {
  const [hov, setHov] = useState(false);

  const brands = item?.brands || [];
  const color = item?.color || C.orange;

  return (
    <div
      onMouseEnter={() => !isMobile && setHov(true)}
      onMouseLeave={() => !isMobile && setHov(false)}
      style={{
        background: C.cardBg,
        border: `1px solid ${hov ? color : C.borderLight}`,
        borderRadius: 6,
        overflow: 'hidden',
        boxShadow: hov
          ? `0 20px 48px rgba(0,0,0,0.09)`
          : '0 2px 8px rgba(0,0,0,0.04)',
        transform: hov ? 'translateY(-5px)' : 'none',
        transition: 'all 0.25s cubic-bezier(0.34,1.2,0.64,1)',
        animation: visible
          ? `auFadeUp 0.6s ease ${index * 0.09}s both`
          : 'none',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
    >
      {/* Top bar */}
      <div style={{ height: 4, background: color }} />

      <div style={{ padding: isMobile ? '20px' : '24px 26px 26px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Icon + badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16
        }}>
          <div style={{
            width: isMobile ? 44 : 52,
            height: isMobile ? 44 : 52,
            background: `${color}14`,
            border: `1.5px solid ${color}30`,
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isMobile ? 20 : 24,
          }}>
            {item?.icon}
          </div>

          <span style={{
            fontFamily: FB,
            fontSize: 10,
            fontWeight: 700,
            background: `${color}14`,
            color: color,
            border: `1px solid ${color}30`,
            padding: '3px 10px',
            borderRadius: 2,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            {item?.badge}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: FD,
          fontSize: isMobile ? 18 : 20,
          fontWeight: 700,
          color: C.textBody,
          lineHeight: 1.2,
          marginBottom: 10,
        }}>
          {item?.title}
        </h3>

        {/* Description */}
        <p style={{
          fontFamily: FB,
          fontSize: 13,
          fontWeight: 400,
          color: C.textMuted,
          lineHeight: 1.7,
          marginBottom: 16,
          flex: 1,
        }}>
          {item?.desc}
        </p>

        {/* Brands */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          marginBottom: 18
        }}>
          {brands.map((b, i) => (
            <span key={i} style={{
              fontFamily: FB,
              fontSize: 11,
              fontWeight: 500,
              color: C.graphite,
              background: C.offwhite,
              border: `1px solid ${C.borderLight}`,
              padding: '3px 9px',
              borderRadius: 3,
            }}>
              {b}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto'
        }}>
          <span style={{
            fontFamily: FB,
            fontSize: 12,
            fontWeight: 600,
            color: color,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}>
            {learnMore}
          </span>

          <div style={{
            width: 28,
            height: 28,
            background: `${color}14`,
            border: `1px solid ${color}30`,
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color,
            fontSize: 12,
            opacity: hov ? 1 : 0.55,
            transition: 'opacity 0.2s',
          }}>
            →
          </div>
        </div>

      </div>
    </div>
  );
}

/* ───────────────────────────────────────────── */
export default function AboutActivities() {
  const [ref, visible] = useInView(0.08);
  const { t } = useLanguage();
  const width = useWindowSize();

  const data = t('parts.components.aboutActivities') || {};
  const items = Array.isArray(data.items) ? data.items : [];
  const learnMore = data.learnMore || 'Learn more →';

  // Responsive logic
  const isMobile = width <= 900;
  const isTiny = width <= 480;

  return (
    <section style={{
      background: C.pageBg,
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
            marginBottom: isMobile ? 32 : 52,
            animation: visible ? 'auFadeUp 0.6s ease both' : 'none'
          }}
        >
          <SLabel>{data.label}</SLabel>

          <h2 style={{
            fontFamily: FD,
            fontSize: isTiny ? 28 : (isMobile ? 36 : 46),
            fontWeight: 700,
            color: C.textBody,
            lineHeight: 1.1,
            marginTop: 8
          }}>
            {data.titleLine1}<br />
            <em style={{ color: C.orange, fontStyle: 'italic' }}>
              {data.titleHighlight}
            </em>
          </h2>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile ? 16 : 20,
          marginBottom: isMobile ? 40 : 80
        }}>
          {items.map((item, i) => (
            <CoreCard
              key={i}
              item={item}
              index={i}
              visible={visible}
              isMobile={isMobile}
            />
          ))}
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