import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '../i18n/detect';

interface LanguageSwitcherProps {
  variant?: 'sidebar' | 'onboarding';
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = 'sidebar' }) => {
  const { t, i18n } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = (i18n.resolvedLanguage || i18n.language) as SupportedLanguage;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const choose = (lng: SupportedLanguage) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-slate-500 hover:text-cyan-100 transition-colors rounded-xl px-3 py-2 hover:bg-white/5"
        aria-label={t('language.label')}
      >
        <span className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <span className="font-mono text-[10px] uppercase tracking-widest">
            {t(`language.${current}`)}
          </span>
        </span>
      </button>
      {open && (
        <div
          className={`absolute z-50 min-w-[160px] rounded-xl border border-white/10 bg-slate-950/95 backdrop-blur-xl shadow-2xl p-1 ${
            variant === 'onboarding' ? 'right-0 top-full mt-2' : 'left-0 bottom-full mb-2'
          }`}
        >
          {SUPPORTED_LANGUAGES.map((lng) => (
            <button
              key={lng}
              onClick={() => choose(lng)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <span>{t(`language.${lng}`)}</span>
              {current === lng && <Check className="w-3.5 h-3.5 text-cyan-300" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
