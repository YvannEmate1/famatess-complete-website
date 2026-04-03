import React from 'react';
import { C, FD, FB } from '../theme';
import { useInView } from '../utils/siteConfig';
import { useLanguage } from '../i18n';

export default function Sustainability() {
  const [ref, visible] = useInView(0.15);
  const { t } = useLanguage();

  const pillars = t('parts.components.sustainability.pillars') || [];
  const eyebrow = t('parts.components.sustainability.eyebrow');
  const heading = t('parts.components.sustainability.heading');
  const body = t('parts.components.sustainability.body');
  const cta = t('parts.components.sustainability.cta');

  return (
    <section ref={ref} style={{ background: C.white, padding: '96px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

          <div style={{ animation: visible ? 'fadeUp 0.7s ease both' : 'none' }}>
            <div style={{ fontFamily: FB, fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.orange, marginBottom: 12 }}>
              {eyebrow}
            </div>

            <h2 style={{ fontFamily: FD, fontSize: 46, fontWeight: 700, color: C.black, lineHeight: 1.1, marginBottom: 20 }}>
              {heading}
            </h2>

            <p style={{ fontFamily: FB, fontSize: 15, fontWeight: 300, color: C.graphite, lineHeight: 1.8, marginBottom: 32 }}>
              {body}
            </p>

            <button className="btn-primary" style={{ fontFamily: FB, fontSize: 13, fontWeight: 600, background: C.orange, color: C.black, border: 'none', padding: '13px 30px', borderRadius: 2, cursor: 'pointer' }}>
              {cta}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {pillars.map((p, i) => (
              <div key={i} className="card-hover" style={{ background: i % 2 === 0 ? C.offwhite : C.black, border: `1px solid ${i % 2 === 0 ? C.silver : 'rgba(80,80,88,0.4)'}`, padding: '28px 24px', borderRadius: 2, cursor: 'pointer', animation: visible ? `fadeUp 0.6s ease ${i * 0.1}s both` : 'none' }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{p.icon}</div>
                <div style={{ fontFamily: FD, fontSize: 17, fontWeight: 700, color: i % 2 === 0 ? C.black : C.white, marginBottom: 8 }}>{p.title}</div>
                <p style={{ fontFamily: FB, fontSize: 13, color: C.graphite, lineHeight: 1.65 }}>{p.body}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}