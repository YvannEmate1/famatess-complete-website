import React, { useEffect, useState } from 'react';
import { C, FD, FB } from '../theme';
import { useLanguage } from '../i18n';

function NavButton({ label, onClick, hovered, onHover, mobile }) {
  return (
    <button
      type="button"
      className="nav-link"
      onClick={onClick}
      onMouseEnter={() => onHover && onHover(true)}
      onMouseLeave={() => onHover && onHover(false)}
      style={{
        fontFamily: FB,
        fontSize: mobile ? 16 : 13,
        fontWeight: 600,
        color: hovered ? C.orange : (mobile ? C.white : C.silver),
        letterSpacing: '0.04em',
        transition: 'color 0.2s',
        position: 'relative',
        padding: mobile ? '12px 0' : '0 0 2px 0',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        textAlign: mobile ? 'left' : 'left',
        width: mobile ? '100%' : 'auto'
      }}
    >
      {label}
      {!mobile && hovered && <span className="nav-underline" />}
    </button>
  );
}

function MenuItem({ hash, label, onClose, mobile }) {
  return (
    <button
      role="menuitem"
      onClick={() => {
        window.location.hash = hash;
        onClose();
      }}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        padding: mobile ? '10px 0' : '10px 14px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontFamily: FB,
        fontSize: mobile ? 14 : 13,
        color: mobile ? C.graphite : C.black
      }}
    >
      {label}
    </button>
  );
}

function LanguageToggle({ mobile }) {
  const { lang, setLang } = useLanguage();
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {['en', 'fr'].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{
            padding: '5px 10px',
            borderRadius: 4,
            border: lang === l ? `1px solid ${C.orange}` : `1px solid ${C.graphite}`,
            background: lang === l ? C.orange : 'transparent',
            color: lang === l ? C.black : C.silver,
            cursor: 'pointer',
            fontSize: 11,
            fontWeight: 700
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function NavbarClean() {
  const { t } = useLanguage();
  const navbar = t('parts.components.navbar', {});

  const [scrolled, setScrolled] = useState(false);
  const [hovAbout, setHovAbout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const menuItems = Array.isArray(navbar.menuItems) ? navbar.menuItems : [];

  const handleNav = (hash) => {
    window.location.hash = hash;
    setMobileMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @keyframes slideRight { from { transform: scaleX(0);} to { transform: scaleX(1);} }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .nav-link:hover{ color: ${C.orange} !important; }
        .nav-underline {
          position:absolute;
          bottom:-2px;
          left:0;
          right:0;
          height:2px;
          background:${C.orange};
          border-radius:2px;
          transform-origin:left;
          animation: slideRight 0.2s ease both;
        }
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; align-items: center; justify-content: center; }
        }
        @media (min-width: 1025px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>

      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          background: scrolled ? 'rgba(18,18,20,0.98)' : C.black,
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: `2px solid ${C.orange}`,
          transition: 'all 0.3s'
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 20px',
            height: 68,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* LOGO */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
            onClick={() => { window.location.hash = '#/home'; }}
          >
            <img src="/Assets/logo-no-bg.png" alt="Logo" style={{ height: 45, width: 'auto' }} />
            <h2 style={{
              margin: 0,
              fontFamily: FD,
              fontSize: 14,
              fontWeight: 800,
              color: C.orange,
              letterSpacing: '0.02em'
            }}>
              {navbar.company}
            </h2>
          </div>

          {/* DESKTOP NAV */}
          <div className="desktop-nav" style={{ gap: 20, alignItems: 'center' }}>
            <NavButton label={navbar.home} onClick={() => handleNav('#/home')} hovered={false} />
            <NavButton label={navbar.aboutUs} onClick={() => handleNav('#/about-us')} hovered={hovAbout} onHover={setHovAbout} />
            <NavButton label={navbar.chooseUs} onClick={() => handleNav('#/choose-us')} hovered={false} />

            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  fontFamily: FB, fontSize: 12, fontWeight: 600, background: 'transparent',
                  color: C.silver, border: `1px solid ${C.silver}`, padding: '6px 10px',
                  borderRadius: 4, cursor: 'pointer'
                }}
              >
                {navbar.menu} ▾
              </button>
              {menuOpen && (
                <div style={{
                  position: 'absolute', right: 0, top: '120%', background: C.white,
                  borderRadius: 6, boxShadow: '0 10px 30px rgba(0,0,0,0.2)', minWidth: 200
                }}>
                  {menuItems.map(item => (
                    <MenuItem key={item.hash} hash={item.hash} label={item.label} onClose={() => setMenuOpen(false)} />
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginLeft: 10 }}>
              <LanguageToggle />
              <button
                className="btn-primary"
                onClick={() => handleNav('#/localisation')}
                style={{
                  fontFamily: FB, fontSize: 12, fontWeight: 700, background: C.orange,
                  color: C.black, border: 'none', padding: '8px 18px', borderRadius: 2, cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {navbar.contact}
              </button>
            </div>
          </div>

          {/* MOBILE TOGGLE BUTTON */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(true)}
            style={{
              background: 'transparent', border: 'none', color: C.orange,
              fontSize: 24, cursor: 'pointer', padding: 5
            }}
          >
            ☰
          </button>
        </div>

        {/* MOBILE DRAWER OVERLAY */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              onClick={() => setMobileMenuOpen(false)}
              style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
                background: 'rgba(0,0,0,0.7)', zIndex: 1100, backdropFilter: 'blur(4px)'
              }} 
            />
            
            {/* Drawer */}
            <div style={{
              position: 'fixed', top: 0, right: 0, width: '80%', maxWidth: 320, height: '100vh',
              background: '#121214', zIndex: 1200, padding: '30px 25px',
              display: 'flex', flexDirection: 'column',
              boxShadow: '-5px 0 25px rgba(0,0,0,0.5)',
              animation: 'slideIn 0.3s ease-out'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                <span style={{ fontFamily: FD, color: C.orange, fontSize: 14, fontWeight: 800 }}>MENU</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ background: 'transparent', border: 'none', color: C.white, fontSize: 24, cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <NavButton label={navbar.home} onClick={() => handleNav('#/home')} mobile />
                <NavButton label={navbar.aboutUs} onClick={() => handleNav('#/about-us')} mobile />
                <NavButton label={navbar.chooseUs} onClick={() => handleNav('#/choose-us')} mobile />
                
                <div style={{ margin: '20px 0', borderTop: `1px solid rgba(255,255,255,0.1)`, paddingTop: 20 }}>
                  <p style={{ color: C.orange, fontFamily: FB, fontSize: 11, fontWeight: 700, marginBottom: 10, letterSpacing: '0.1em' }}>
                    {navbar.menu?.toUpperCase()}
                  </p>
                  {menuItems.map(item => (
                    <MenuItem key={item.hash} hash={item.hash} label={item.label} onClose={() => setMobileMenuOpen(false)} mobile />
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 20, paddingBottom: 20 }}>
                <LanguageToggle mobile />
                <button
                  onClick={() => handleNav('#/localisation')}
                  style={{
                    fontFamily: FB, fontSize: 14, fontWeight: 700, background: C.orange,
                    color: C.black, border: 'none', padding: '14px', borderRadius: 4, cursor: 'pointer'
                  }}
                >
                  {navbar.contact}
                </button>
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  );
}