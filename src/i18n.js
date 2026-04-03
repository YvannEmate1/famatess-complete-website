// src/i18n.js
import React, { createContext, useContext, useMemo, useState, useEffect, useCallback } from 'react';

const LanguageContext = createContext({ lang: 'en', setLang: () => {}, t: (k) => k });

const translations = {
  en: {},
  fr: {}
};

function getNested(obj, key) {
  if (!obj || !key) return undefined;
  const parts = key.split('.');
  let acc = obj;
  for (const part of parts) {
    if (acc === undefined || acc === null) return undefined;
    const bracketRe = /([^\[\]]+)|\[(\d+)\]/g;
    let match;
    const tokens = [];
    while ((match = bracketRe.exec(part)) !== null) {
      if (match[1]) tokens.push(match[1]);
      if (match[2]) tokens.push(Number(match[2]));
    }
    for (const token of tokens) {
      acc = acc[token];
      if (acc === undefined) return undefined;
    }
  }
  return acc;
}

export function LanguageProvider({ children, defaultLang = 'en' }) {
  const initial = (typeof window !== 'undefined' && localStorage.getItem('lang')) || defaultLang;
  const [lang, setLang] = useState(initial);
  const [translationsData, setTranslationsData] = useState({ en: {}, fr: {} });
  const [loading, setLoading] = useState(true);

  // Load translations from public/locales
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setLoading(true);
        const enResponse = await fetch('/locales/en/translation.json');
        const frResponse = await fetch('/locales/fr/translation.json');
        
        const enData = await enResponse.json();
        const frData = await frResponse.json();
        
        setTranslationsData({ en: enData, fr: frData });
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to empty objects
        setTranslationsData({ en: {}, fr: {} });
      } finally {
        setLoading(false);
      }
    };

    if (typeof window !== 'undefined') {
      loadTranslations();
    }
  }, []);

  // Persist language
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('lang', lang);
      }
    } catch (e) {
      // ignore
    }
  }, [lang]);

  const t = useCallback((key) => {
    if (!key || loading) return '';
    const nested = getNested(translationsData[lang], key);
    if (nested !== undefined) return nested;
    return translationsData[lang]?.[key] || key;
  }, [lang, translationsData, loading]);

  const value = useMemo(() => ({ 
    lang, 
    setLang, 
    t, 
    loading 
  }), [lang, t, loading]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export default { LanguageProvider, useLanguage };
