import { useState, useRef, useEffect } from 'react';
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

/* ─────────────────────────────────────────────
   VideoCard Component
───────────────────────────────────────────── */
function VideoCard({ src, caption, label, index, visible, color, t }) {
  const [playing, setPlaying] = useState(false);
  const [hov, setHov] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.cardBg,
        border: `1px solid ${hov ? color : C.borderLight}`,
        borderRadius: 6,
        overflow: 'hidden',
        boxShadow: hov ? `0 20px 48px rgba(0,0,0,0.10)` : '0 2px 8px rgba(0,0,0,0.04)',
        transform: hov ? 'translateY(-5px)' : 'none',
        transition: 'all 0.25s cubic-bezier(0.34,1.2,0.64,1)',
        animation: visible ? `achFadeUp 0.6s ease ${index * 0.12}s both` : 'none',
        cursor: 'pointer',
      }}
    >
      <div style={{
        height: 'clamp(200px, 28vw, 280px)',
        background: C.cardImgBg,
        position: 'relative', overflow: 'hidden',
      }}>
        <video
          ref={videoRef}
          src={src || ''}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', display: 'block',
            background: C.cardImgBg,
          }}
          onEnded={() => setPlaying(false)}
          playsInline
          preload="metadata"
        />

        <div
          onClick={playing ? handlePause : handlePlay}
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: playing ? 'transparent' : 'rgba(0,0,0,0.28)',
            transition: 'background 0.25s',
          }}
        >
          {!playing && (
            <div style={{
              width: 56, height: 56,
              borderRadius: '50%',
              background: color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 4px 24px ${color}60`,
              transition: 'transform 0.2s',
              transform: hov ? 'scale(1.1)' : 'scale(1)',
            }}>
              <div style={{
                width: 0, height: 0,
                borderTop: '10px solid transparent',
                borderBottom: '10px solid transparent',
                borderLeft: '18px solid #fff',
                marginLeft: 4,
              }} />
            </div>
          )}
        </div>

        <div style={{
          position: 'absolute', top: 14, left: 14,
          background: color, color: '#fff',
          fontFamily: FB, fontSize: 10, fontWeight: 700,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '3px 10px', borderRadius: 3,
        }}>
          {label}
        </div>
      </div>

      <div style={{
        padding: 'clamp(14px, 2.5vw, 18px) clamp(16px, 3vw, 22px)',
        borderTop: `1px solid ${C.borderLight}`,
      }}>
        <p style={{
          fontFamily: FB, fontSize: 'clamp(12px, 1.5vw, 13px)', fontWeight: 400,
          color: C.textMuted, lineHeight: 1.7, marginBottom: 10,
        }}>
          {caption}
        </p>
        <span style={{
          fontFamily: FB, fontSize: 12, fontWeight: 600,
          color: color, textTransform: 'uppercase', letterSpacing: '0.06em',
        }}>
          {t('parts.components.achievements.playCta')}
        </span>
      </div>
    </div>
  );
}

export default function Achievement() {
  const { t } = useLanguage();
  const [refHero, visibleHero]   = useInView(0.08);
  const [refMedia, visibleMedia] = useInView(0.08);
  const [refCTA, visibleCTA]     = useInView(0.15);
  const [imgHov, setImgHov]      = useState(false);

  // Accessing the JSON structure precisely as defined in your translation file
  const data       = t('parts.components.achievements') || {};
  const media      = data.media || {};
  const partner    = data.items?.partner || {}; // Changed from elecam to partner
  const locLabel   = t('parts.components.localisation.locations.1.val') || 'Douala, Cameroun';

  return (
    <section style={{
      background: C.white,
      padding: 'clamp(64px, 10vw, 96px) 0',
      borderTop: `1px solid ${C.borderLight}`,
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 64px)',
      }}>

        {/* Header Section */}
        <div ref={refHero} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(24px, 5vw, 64px)',
          alignItems: 'flex-start',
          marginBottom: 'clamp(40px, 7vw, 64px)',
          animation: visibleHero ? 'achFadeUp 0.6s ease both' : 'none',
        }}>
          <div>
            <SLabel>{data.title}</SLabel>
            <h2 style={{
              fontFamily: FD,
              fontSize: 'clamp(30px, 5vw, 48px)',
              fontWeight: 700,
              color: C.textBody,
              lineHeight: 1.08,
            }}>
              {partner.title}<br />
              <em style={{ color: C.orange, fontStyle: 'italic' }}>{locLabel}</em>
            </h2>
          </div>
          <p style={{
            fontFamily: FB,
            fontSize: 'clamp(14px, 1.8vw, 15px)',
            fontWeight: 400,
            color: C.textMuted,
            lineHeight: 1.85,
            paddingTop: 8,
          }}>
            {partner.description}
          </p>
        </div>

        {/* Hero Image Section */}
        <div
          onMouseEnter={() => setImgHov(true)}
          onMouseLeave={() => setImgHov(false)}
          style={{
            borderRadius: 8,
            overflow: 'hidden',
            border: `1px solid ${imgHov ? C.orange : C.borderLight}`,
            boxShadow: imgHov ? '0 24px 56px rgba(0,0,0,0.12)' : '0 4px 16px rgba(0,0,0,0.06)',
            transform: imgHov ? 'translateY(-3px)' : 'none',
            transition: 'all 0.28s cubic-bezier(0.34,1.2,0.64,1)',
            marginBottom: 'clamp(20px, 4vw, 28px)',
            position: 'relative',
            animation: visibleHero ? 'achFadeUp 0.65s ease 0.1s both' : 'none',
          }}
        >
          <div style={{
            height: 'clamp(260px, 40vw, 500px)',
            background: C.cardImgBg,
            position: 'relative', overflow: 'hidden',
          }}>
            <img
              src={media.mainImage}
              alt={partner.title}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', display: 'block',
                transform: imgHov ? 'scale(1.03)' : 'scale(1)',
                transition: 'transform 0.4s ease',
              }}
            />
            
            <div style={{
              position: 'absolute', top: 16, left: 16,
              background: C.orange, color: '#fff',
              fontFamily: FB, fontSize: 10, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '4px 12px', borderRadius: 3,
            }}>
              {data.officialBadge}
            </div>

            <div style={{
              position: 'absolute', top: 16, right: 16,
              background: 'rgba(18,18,20,0.75)', backdropFilter: 'blur(4px)',
              color: C.silver, fontFamily: FB, fontSize: 11, fontWeight: 500,
              padding: '4px 12px', borderRadius: 3,
              border: '1px solid rgba(80,80,88,0.4)',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span>📍</span> {locLabel}
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div
          ref={refMedia}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(14px, 3vw, 20px)',
            marginBottom: 'clamp(40px, 7vw, 64px)',
          }}
        >
          <VideoCard
            src={media.video1}
            caption={partner.title}
            label={`${data.videoLabel} 01`}
            index={0}
            visible={visibleMedia}
            color={C.orange}
            t={t}
          />
          <VideoCard
            src={media.video2}
            caption={partner.title}
            label={`${data.videoLabel} 02`}
            index={1}
            visible={visibleMedia}
            color={C.blue}
            t={t}
          />
        </div>

        {/* FAMATESS COMPANY Trust Banner */}
        <div
          ref={refCTA}
          style={{
            background: C.black,
            borderRadius: 8,
            padding: 'clamp(32px, 6vw, 56px) clamp(24px, 5vw, 56px)',
            position: 'relative', overflow: 'hidden',
            border: `1px solid rgba(255,140,30,0.18)`,
            animation: visibleCTA ? 'achFadeUp 0.7s ease both' : 'none',
          }}
        >
          <div style={{
            position: 'absolute', right: -20, top: '50%', transform: 'translateY(-52%)',
            fontFamily: FD, fontSize: 'clamp(60px, 12vw, 140px)', fontWeight: 900,
            color: 'rgba(255,140,30,0.05)', lineHeight: 1,
            userSelect: 'none', pointerEvents: 'none',
            letterSpacing: '-0.02em', whiteSpace: 'nowrap',
          }}>
            FAMATESS
          </div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,140,30,0.1)',
              border: `1px solid rgba(255,140,30,0.25)`,
              color: C.orangeTint,
              fontFamily: FB, fontSize: 11, fontWeight: 600,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              padding: '5px 16px', borderRadius: 2,
              marginBottom: 20,
            }}>
              {data.partnerLabel}
            </div>

            <h3 style={{
              fontFamily: FD,
              fontSize: 'clamp(26px, 4.5vw, 44px)',
              fontWeight: 900,
              color: C.white,
              lineHeight: 1.08,
              marginBottom: 14,
              maxWidth: 800,
            }}>
              {data.trustText}
            </h3>

            <p style={{
              fontFamily: FB,
              fontSize: 'clamp(13px, 1.8vw, 15px)',
              fontWeight: 300,
              color: C.graphite,
              lineHeight: 1.8,
              maxWidth: 600,
            }}>
              {data.companyDesc}
            </p>

            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: 20,
              marginTop: 32, opacity: 0.8
            }}>
              {['✓ Livraison Garantie', '✓ Installation Certifiée', '✓ Support Technique'].map(tag => (
                <span key={tag} style={{
                  fontFamily: FB, fontSize: 12, color: C.white,
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <span style={{ color: C.orange }}>●</span> {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes achFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}