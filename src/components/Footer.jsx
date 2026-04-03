import React from 'react';
import { Link } from 'react-router-dom';
import { C, FD, FB } from '../theme';
import { useLanguage } from '../i18n';

export default function Footer() {
  const { t } = useLanguage();

  // Get full footer object
  const footer = t('parts.components.footer', {});

  // Safe arrays
  const cols = Array.isArray(footer.cols) ? footer.cols : [];
  const bottomLinks = Array.isArray(footer.bottomLinks) ? footer.bottomLinks : [];

  return (
    <footer style={{ background: C.black, borderTop: `3px solid ${C.orange}` }}>
      <div className="footer-container" style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 64px 40px' }}>

        {/* Top grid */}
        <div className="footer-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1.6fr 1fr 1fr 1fr', 
          gap: 48, 
          marginBottom: 56 
        }}>
          
          {/* Brand */}
          <div className="footer-brand">
            <div style={{
              fontFamily: FD,
              fontSize: 32,
              fontWeight: 900,
              color: C.orange,
              letterSpacing: '0.06em',
              marginBottom: 10
            }}>
              {footer.brand}
            </div>

            <div style={{
              fontFamily: FB,
              fontSize: 12,
              fontWeight: 700,
              color: C.orange,
              letterSpacing: '0.08em',
              marginBottom: 14
            }}>
              {footer.tagline}
            </div>

            <p className="brand-description" style={{
              fontFamily: FB,
              fontSize: 13,
              color: C.graphite,
              lineHeight: 1.7,
              maxWidth: 260
            }}>
              {footer.description}
            </p>
          </div>

          {/* Columns */}
          {cols.map((col, idx) => (
            <div key={idx} className="footer-col">
              <div style={{
                fontFamily: FB,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: C.orange,
                marginBottom: 18
              }}>
                {col.title}
              </div>

              {(Array.isArray(col.links) ? col.links : []).map((l, i) => (
                <Link
                  key={i}
                  to={(l.hash || '#/home').replace(/^#/, '')}
                  style={{
                    display: 'block',
                    fontFamily: FB,
                    fontSize: 13,
                    color: C.graphite,
                    marginBottom: 11,
                    textDecoration: 'none'
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="footer-bottom" style={{
          borderTop: '1px solid rgba(80,80,88,0.35)',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontFamily: FB, fontSize: 12, color: C.graphite }}>
            {footer.copyright}
          </div>

          <div className="bottom-links" style={{ display: 'flex', gap: 28 }}>
            {bottomLinks.map((l, i) => (
              <span key={i} style={{
                fontFamily: FB,
                fontSize: 12,
                color: C.graphite,
                cursor: 'pointer'
              }}>
                {l}
              </span>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
        }

        @media (max-width: 768px) {
          .footer-container {
            padding: 48px 32px 32px !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            gap: 20px !important;
            text-align: center !important;
          }
          .bottom-links {
            justify-content: center !important;
            gap: 20px !important;
          }
        }

        @media (max-width: 580px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            margin-bottom: 40px !important;
          }
          .brand-description {
            max-width: 100% !important;
          }
          .footer-container {
            padding: 40px 24px 32px !important;
          }
        }
      `}</style>
    </footer>
  );
}