import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { SUPPORTED_LANGUAGES, normalizeLanguage } from './detect';

// Vite bundle sẵn toàn bộ JSON locale lúc build.
const modules = import.meta.glob('./locales/**/*.json', { eager: true }) as Record<
  string,
  { default: Record<string, unknown> }
>;

const resources: Record<string, Record<string, Record<string, unknown>>> = {};
for (const path in modules) {
  const match = path.match(/\.\/locales\/([^/]+)\/([^/]+)\.json$/);
  if (!match) continue;
  const [, lng, ns] = match;
  resources[lng] = resources[lng] || {};
  resources[lng][ns] = modules[path].default;
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: [...SUPPORTED_LANGUAGES],
    fallbackLng: 'zh-CN',
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'app_lang',
      convertDetectedLanguage: (lng: string) => normalizeLanguage(lng),
    },
    saveMissing: import.meta.env.DEV,
    missingKeyHandler: (lngs, ns, key) => {
      if (import.meta.env.DEV) {
        console.warn(`[i18n] missing key: ${ns}:${key} (${lngs.join(',')})`);
      }
    },
  });

export default i18n;
