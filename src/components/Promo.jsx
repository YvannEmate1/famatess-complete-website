import React from 'react';
import { useLanguage } from '../i18n';

export default function Promo() {
  const { t } = useLanguage();

  return (
    <section className="grid md:grid-cols-2 items-center px-10 py-20 gap-10">
      <div>
        <h2 className="text-5xl font-extrabold mb-4">{t('parts.components.promo.title')}</h2>
        <p className="text-[#505058] mb-6">{t('parts.components.promo.desc')}</p>
        <button className="bg-[#FF8C1E] hover:bg-[#E6640A] px-6 py-3 rounded-xl text-white">
          {t('parts.components.promo.cta')}
        </button>
      </div>

      <img
        src="https://images.unsplash.com/photo-1502877338535-766e1452684a"
        className="rounded-2xl shadow-lg"
      />
    </section>
  );
}