import React from 'react';
import { C } from '../theme';
import { useLanguage } from '../i18n';

export default function InvestorsStrip() {
  const { t } = useLanguage();

  const stats = Array.isArray(t('stats')) ? t('stats') : [
    { label: 'Market Cap', val: '€1B' }
  ];

  return (
    <section style={{ background: C.black }}>
      <div>
        {stats.map((s, i) => (
          <div key={i}>
            <h3>{s.val}</h3>
            <p>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}