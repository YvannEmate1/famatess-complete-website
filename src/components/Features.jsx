import React from 'react';
import { useLanguage } from '../i18n';

export default function Features() {
  const { t } = useLanguage();
  const features = t("parts.components.features.items", { returnObjects: true });

  return (
    <section>
      <div>
        {features.map((f, i) => (
          <div key={i}>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}