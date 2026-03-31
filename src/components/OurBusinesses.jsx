import React, { useState } from 'react';
import { C, FD, FB } from '../theme';
import { useInView } from '../utils/siteConfig';
import { useLanguage } from '../i18n';

export default function OurBusinesses() {
  const [ref, visible] = useInView(0.1);
  const [hov, setHov] = useState(null);
  const { t } = useLanguage();
const SECTORS = t('parts.components.ourBusinesses.sectors');
const sectorsArray = Array.isArray(SECTORS) ? SECTORS : [];
  return (
    <section ref={ref} style={{ padding: '96px 0', background: C.offwhite }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 56 }}>
          <div>
            <div style={{ fontFamily: FB, fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.orange, marginBottom: 10 }}>
              {t('parts.components.ourBusinesses.eyebrow')}
            </div>
            <h2 style={{ fontFamily: FD, fontSize: 48, fontWeight: 700, color: C.black, lineHeight: 1.1 }}>
              {t('parts.components.ourBusinesses.heading').split('\n').map((line,i) => <span key={i}>{line}<br/></span>)}
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          {sectorsArray.map((s, i) => (
            <div key={s.name} className="card-hover" onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ background: C.white, border: `1px solid ${hov === i ? C.orange : C.silver}`, borderRadius: 2, padding: '36px 32px', cursor: 'pointer', transition: 'all 0.25s', animation: visible ? `fadeUp 0.6s ease ${i * 0.08}s both` : 'none', maxWidth: 500, width: '100%' }}>
              <div style={{ width: 52, height: 52, background: `${s.color}15`, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 20, border: `1px solid ${s.color}30` }}>
                {s.icon}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <h3 style={{ fontFamily: FD, fontSize: 22, fontWeight: 700, color: C.black }}>{s.name}</h3>
                <span className="sector-arrow" style={{ fontSize: 18, color: s.color, transition: 'transform 0.2s', display: 'inline-block' }}>→</span>
              </div>
              <p style={{ fontFamily: FB, fontSize: 14, color: C.graphite, lineHeight: 1.7, marginBottom: 16 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}