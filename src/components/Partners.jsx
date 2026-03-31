import React from 'react';
import { C, FD, FB } from '../theme';
import { useLanguage } from '../i18n';

export default function Partners() {
  const { t } = useLanguage();
  const partners = t('parts.components.partners.list');
  const partnersArray = Array.isArray(partners) ? partners : [];

  return (
    <section style={{ background: C.orange, padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background Watermark */}
      <div
        style={{
          position: 'absolute',
          left: -40,
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: FD,
          fontSize: 200,
          fontWeight: 900,
          color: 'rgba(180,70,0,0.10)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        {t('parts.components.partners.heading')}
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <div style={{ 
            fontFamily: FB, 
            fontSize: 12, 
            fontWeight: 700, 
            letterSpacing: '0.2em', 
            textTransform: 'uppercase', 
            color: 'rgba(18,18,20,0.6)', 
            marginBottom: 10 
          }}>
            {t('parts.components.partners.eyebrow')}
          </div>
          <h2 style={{ fontFamily: FD, fontSize: 42, fontWeight: 900, color: C.black, margin: 0 }}>
            {t('parts.components.partners.heading')}
          </h2>
        </div>

        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '40px 60px' 
        }}>
          {partnersArray.map((p, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.filter = 'grayscale(0%) brightness(100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.filter = 'grayscale(100%) brightness(0%) opacity(0.7)';
              }}
            >
              <img 
                src={p.logo} 
                alt={p.name}
                style={{
                  height: '50px',
                  width: 'auto',
                  maxWidth: '140px',
                  objectFit: 'contain',
                  filter: 'grayscale(100%) brightness(0%) opacity(0.7)', // Elegant dark silhouette look
                  transition: 'filter 0.3s ease'
                }}
              />
              <span style={{
                fontFamily: FD,
                fontSize: 14,
                fontWeight: 700,
                color: C.black,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}