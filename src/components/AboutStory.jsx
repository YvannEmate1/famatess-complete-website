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

/* ─────────────────────────────────────────────
   AboutStory (RESPONSIVE VERSION)
───────────────────────────────────────────── */
export default function AboutStory() {
  const [ref, visible] = useInView(0.1);
  const { t } = useLanguage();

  // SAFE DATA
  const data = t('parts.components.aboutStory') || {};

  const paragraphs = data.paragraphs || [];
  const milestones = data.milestones || [];

  return (
    <section className="about-story-section" style={{ background: C.white, padding: '96px 0', borderBottom: `1px solid ${C.borderLight}` }}>
      <div className="about-story-container" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px' }}>
        <div className="about-story-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center',
        }}>

          {/* Left — text */}
          <div ref={ref} style={{ animation: visible ? 'auFadeUp 0.65s ease both' : 'none' }}>
            <SLabel>{data.label || ''}</SLabel>

            <h2 style={{
              fontFamily: FD,
              fontSize: 'clamp(32px, 4vw, 42px)',
              fontWeight: 700,
              color: C.textBody,
              lineHeight: 1.1,
              marginBottom: 20,
            }}>
              {data.titleLine1 || ''}<br />
              <em style={{ color: C.orange, fontStyle: 'italic' }}>
                {data.titleHighlight || ''}
              </em>
            </h2>

            {paragraphs.length > 0 && paragraphs.map((p, i) => (
              <p
                key={i}
                style={{
                  fontFamily: FB,
                  fontSize: 15,
                  fontWeight: 400,
                  color: C.textMuted,
                  lineHeight: 1.85,
                  marginBottom: i !== paragraphs.length - 1 ? 18 : 0
                }}
                dangerouslySetInnerHTML={{ __html: p }}
              />
            ))}
          </div>

          {/* Right — timeline */}
          {milestones.length > 0 && (
            <div style={{ animation: visible ? 'auFadeUp 0.7s ease 0.1s both' : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {milestones.map((m, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    gap: 20,
                    alignItems: 'flex-start',
                    padding: '20px 0',
                    borderBottom: `1px solid ${C.borderLight}`,
                    animation: visible ? `auFadeUp 0.5s ease ${i * 0.07 + 0.1}s both` : 'none',
                  }}>

                    {/* icon + year */}
                    <div style={{
                      flexShrink: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                      minWidth: 56
                    }}>
                      <div style={{
                        width: 44,
                        height: 44,
                        background: 'rgba(255,140,30,0.1)',
                        border: '1.5px solid rgba(255,140,30,0.3)',
                        borderRadius: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                      }}>
                        {m?.icon || ''}
                      </div>

                      <span style={{
                        fontFamily: FD,
                        fontSize: 12,
                        fontWeight: 700,
                        color: C.orange
                      }}>
                        {m?.year || ''}
                      </span>
                    </div>

                    {/* text */}
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: FB,
                        fontSize: 14,
                        fontWeight: 700,
                        color: C.textBody,
                        marginBottom: 4
                      }}>
                        {m?.title || ''}
                      </div>

                      <div style={{
                        fontFamily: FB,
                        fontSize: 13,
                        color: C.textMuted,
                        lineHeight: 1.65
                      }}>
                        {m?.desc || ''}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      <style>{`
        @keyframes auFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          .about-story-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }
          .about-story-section {
            padding: 64px 0 !important;
          }
        }

        @media (max-width: 768px) {
          .about-story-container {
            padding: 0 32px !important;
          }
        }

        @media (max-width: 480px) {
          .about-story-container {
            padding: 0 24px !important;
          }
          .about-story-section {
            padding: 48px 0 !important;
          }
        }
      `}</style>
    </section>
  );
}