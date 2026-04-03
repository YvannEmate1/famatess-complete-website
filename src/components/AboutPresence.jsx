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

/* ── City card ── */
function CityCard({ city, index, visible, isMobile }) {
  const [hov, setHov] = useState(false);
  if (!city) return null;

  // On mobile, we force "large" cards to behave like normal cards for stacking
  const isLarge = city.size === 'large' && !isMobile;
  const roleColor = city.roleColor || C.orange;
  const services = Array.isArray(city.services) ? city.services : [];

  return (
    <div
      onMouseEnter={() => !isMobile && setHov(true)}
      onMouseLeave={() => !isMobile && setHov(false)}
      style={{
        gridColumn: isLarge ? 'span 2' : 'span 1',
        background: C.cardBg,
        border: `1px solid ${hov ? roleColor : C.borderLight}`,
        borderRadius: 6, overflow: 'hidden',
        boxShadow: hov ? `0 20px 48px rgba(0,0,0,0.1)` : '0 2px 8px rgba(0,0,0,0.04)',
        transform: hov ? 'translateY(-5px)' : 'none',
        transition: 'all 0.25s cubic-bezier(0.34,1.2,0.64,1)',
        animation: visible ? `auFadeUp 0.6s ease ${index * 0.1}s both` : 'none',
        display: 'flex',
        flexDirection: isLarge ? 'row' : 'column',
      }}
    >
      {/* Image zone */}
      <div style={{
        height: isLarge ? 'auto' : (isMobile ? 180 : 200),
        width: isLarge ? '50%' : '100%',
        minHeight: isLarge ? 280 : 'auto',
        background: C.cardImgBg,
        position: 'relative', overflow: 'hidden',
        flexShrink: 0,
      }}>
        {city.image ? (
          <img
            src={city.image}
            alt={city.name}
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              transform: hov ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.4s ease',
            }}
            onError={e => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}

        {/* Fallback */}
        <div style={{
          display: 'none', position: 'absolute', inset: 0,
          alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 8, background: C.cardImgBg,
          color: C.silver, fontFamily: FB, fontSize: 12,
        }}>
          <span style={{ fontSize: 52, opacity: 0.22 }}>{city.icon}</span>
          <span style={{ opacity: 0.4 }}>Image coming soon</span>
        </div>

        {/* Overlay */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
          pointerEvents: 'none',
        }} />

        {/* Role badge */}
        <div style={{
          position: 'absolute', top: 14, left: 14,
          background: roleColor, color: '#fff',
          fontFamily: FB, fontSize: 10, fontWeight: 700,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '3px 10px', borderRadius: 3,
        }}>
          {city.role}
        </div>

        {/* Region chip */}
        <div style={{
          position: 'absolute', bottom: 14, left: 14,
          display: 'flex', alignItems: 'center', gap: 5,
          color: 'rgba(255,255,255,0.85)', fontFamily: FB, fontSize: 12,
        }}>
          <span>🏴</span><span>{city.region}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{
        padding: isMobile ? '20px' : '22px 26px 26px',
        flex: 1, display: 'flex', flexDirection: 'column',
        borderTop: isLarge ? 'none' : `1px solid ${C.borderLight}`,
        borderLeft: isLarge ? `1px solid ${C.borderLight}` : 'none',
      }}>
        {/* City name + icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <span style={{ fontSize: isMobile ? 24 : 28 }}>{city.icon}</span>
          <h3 style={{ fontFamily: FD, fontSize: isMobile ? 20 : 24, fontWeight: 700, color: C.textBody, lineHeight: 1 }}>
            {city.name}
          </h3>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: FB, fontSize: 13, fontWeight: 400,
          color: C.textMuted, lineHeight: 1.7, marginBottom: 16, flex: 1,
        }}>
          {city.desc}
        </p>

        {/* Services tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {services.map((s, i) => (
            <span key={i} style={{
              fontFamily: FB, fontSize: 11, fontWeight: 500,
              color: C.graphite, background: C.offwhite,
              border: `1px solid ${C.borderLight}`,
              padding: '4px 10px', borderRadius: 3,
            }}>
              {s}
            </span>
          ))}
        </div>

        {/* Address */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: FB, fontSize: 12, color: C.textMuted,
          borderTop: `1px solid ${C.borderLight}`, paddingTop: 14,
        }}>
          <span>📍</span>
          <span style={{ lineHeight: 1.4 }}>{city.address}</span>
        </div>
      </div>

      {/* Bottom stripe */}
      <div style={{
        height: isLarge ? 'auto' : 3,
        width: isLarge ? 3 : '100%',
        background: hov ? `linear-gradient(to ${isLarge ? 'bottom' : 'right'}, ${roleColor}, ${C.orange})` : C.borderLight,
        transition: 'background 0.3s',
        flexShrink: 0,
        order: isLarge ? -1 : 1,
      }} />
    </div>
  );
}

/* ───────────────────────────────────────────── */
export default function AboutPresence() {
  const [ref, visible] = useInView(0.08);
  const { t } = useLanguage();
  const width = useWindowSize();

  const data = t('parts.components.aboutPresence') || {};
  const cities = Array.isArray(data.cities) ? data.cities : [];
  
  const isMobile = width <= 768;
  const isTablet = width <= 1024 && width > 768;

  return (
    <section style={{ 
      background: C.white, 
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
        <div ref={ref} style={{
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'flex-end', 
          justifyContent: 'space-between',
          marginBottom: isMobile ? 32 : 52, 
          gap: isMobile ? 24 : 0,
          animation: visible ? 'auFadeUp 0.6s ease both' : 'none',
        }}>
          <div>
            <SLabel>{data.label}</SLabel>
            <h2 style={{ 
              fontFamily: FD, 
              fontSize: isMobile ? 32 : 46, 
              fontWeight: 700, 
              color: C.textBody, 
              lineHeight: 1.1 
            }}>
              {data.titleLine1}<br />
              <em style={{ color: C.orange, fontStyle: 'italic' }}>{data.titleHighlight}</em>
            </h2>
          </div>

          {/* Summary pills */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: 10 
          }}>
            {(Array.isArray(data.summary) ? data.summary : []).map((city, i) => (
              <div key={i} style={{
                fontFamily: FB, fontSize: 12, fontWeight: 600,
                background: `${city.color}12`, color: city.color,
                border: `1.5px solid ${city.color}30`,
                padding: '8px 18px', borderRadius: 4,
              }}>
                📍 {city.label}
              </div>
            ))}
          </div>
        </div>

        {/* Cities grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'), 
          gap: isMobile ? 16 : 20 
        }}>
          {cities.map((city, i) => (
            <CityCard 
              key={i} 
              city={city} 
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