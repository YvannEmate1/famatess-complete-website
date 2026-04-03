import React from 'react';
import { C, FD, FB } from '../theme';
import { useInView } from '../utils/siteConfig';
import { useLanguage } from '../i18n';

export default function AfricaBanner() {
  const [ref, visible] = useInView(0.2);
  const { t } = useLanguage();

  const regions = t("parts.components.africaBanner.regions", { returnObjects: true });

  return (
    <section ref={ref} style={{ background: C.charcoal, padding: '80px 0' }}>
      
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
        
        <div>
          <div style={{ color: C.orange }}>
            {t("parts.components.africaBanner.eyebrow")}
          </div>

          <h2 style={{ fontFamily: FD, fontSize: 48, color: C.white }}>
            {t("parts.components.africaBanner.heading")}
            <br />
            <em style={{ color: C.orange }}>
              {t("parts.components.africaBanner.highlight")}
            </em>
          </h2>

          <p style={{ fontFamily: FB, color: C.graphite }}>
            {t("parts.components.africaBanner.description")}
          </p>

          <div style={{ display: 'flex', gap: 32 }}>
            {regions.map((r, i) => (
              <div key={i}>
                <div style={{ color: C.orange }}>{r.count}</div>
                <div>{r.label}</div>
              </div>
            ))}
          </div>

          <button className="btn-primary">
            {t("parts.components.africaBanner.cta")}
          </button>
        </div>

        <div>
          <div>
            🌍
            <div>{t("parts.components.africaBanner.africaLabel")}</div>
            <div>{t("parts.components.africaBanner.marketsLabel")}</div>
          </div>
        </div>

      </div>
    </section>
  );
}