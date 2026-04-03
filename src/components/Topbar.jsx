import React from 'react';
import { C, FB } from '../theme';
import { useLanguage } from '../i18n';

export default function Topbar() {
  const { t, lang } = useLanguage();
  
  const tickerItems = [
    t('parts.components.hero.headline'),
    t('parts.components.navbar.company'),
    lang === 'en' ? 'Premium Car Rentals' : 'Location Premium',
    lang === 'en' ? 'Yaoundé, Cameroon' : 'Yaoundé, Cameroun'
  ].filter(Boolean);

  // We duplicate the items to ensure the ticker is long enough to loop
  // seamlessly on all screen widths.
  const displayItems = [...tickerItems, ...tickerItems];

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 500 }}>
      <style>{`
        @keyframes ticker { 
          0% { transform: translateX(0); } 
          100% { transform: translateX(-50%); } 
        } 
        .top-ticker { 
          display: flex; 
          animation: ticker 28s linear infinite; 
          white-space: nowrap; 
          width: max-content;
        }
      `}</style>
      <div style={{ 
        background: C.black, 
        overflow: 'hidden', 
        height: 34, 
        display: 'flex', 
        alignItems: 'center', 
        borderBottom: `1px solid rgba(255,140,30,0.25)` 
      }}>
        <div className="top-ticker">
          {displayItems.map((txt, i) => (
            <span key={i} style={{ 
              fontFamily: FB, 
              fontSize: 11, 
              fontWeight: 500, 
              color: C.graphite, 
              letterSpacing: '0.09em', 
              textTransform: 'uppercase', 
              padding: '0 40px',
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0 // Prevents text squishing on mobile
            }}>
              <span style={{ color: C.orange, marginRight: 8 }}>◆</span>
              {txt}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}