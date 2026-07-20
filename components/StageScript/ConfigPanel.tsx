import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { BookOpen, Wand2, BrainCircuit, AlertCircle, ChevronRight, Aperture } from 'lucide-react';
import OptionSelector from './OptionSelector';
import { DURATION_OPTIONS, LANGUAGE_OPTIONS, VISUAL_STYLE_OPTIONS, STYLES } from './constants';
import ModelSelector from '../ModelSelector';

interface Props {
  title: string;
  duration: string;
  language: string;
  model: string;
  visualStyle: string;
  customDurationInput: string;
  customModelInput: string;
  customStyleInput: string;
  isProcessing: boolean;
  error: string | null;
  onTitleChange: (value: string) => void;
  onDurationChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  onModelChange: (value: string) => void;
  onVisualStyleChange: (value: string) => void;
  onCustomDurationChange: (value: string) => void;
  onCustomModelChange: (value: string) => void;
  onCustomStyleChange: (value: string) => void;
  onAnalyze: () => void;
}

const ConfigPanel: React.FC<Props> = ({
  title,
  duration,
  language,
  model,
  visualStyle,
  customDurationInput,
  customModelInput,
  customStyleInput,
  isProcessing,
  error,
  onTitleChange,
  onDurationChange,
  onLanguageChange,
  onModelChange,
  onVisualStyleChange,
  onCustomDurationChange,
  onCustomModelChange,
  onCustomStyleChange,
  onAnalyze
}) => {
  const { t } = useTranslation('script');
  const durationOptions = DURATION_OPTIONS.map(opt => ({ value: opt.value, label: t(opt.labelKey) }));
  const visualStyleOptions = VISUAL_STYLE_OPTIONS.map(opt => ({ value: opt.value, label: t(opt.labelKey), desc: t(opt.descKey) }));

  return (
    <div className="w-96 border-r border-cyan-300/10 flex flex-col bg-slate-950/60 backdrop-blur-2xl">
      <div className="h-16 px-5 border-b border-white/10 flex items-center justify-between shrink-0 bg-white/[0.03]">
        <h2 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-300" />
          {t('configPanel.title')}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <div className="space-y-2">
          <label className={STYLES.label}>{t('configPanel.fieldTitleLabel')}</label>
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className={STYLES.input}
            placeholder={t('configPanel.titlePlaceholder')}
          />
        </div>

        <div className="space-y-2">
          <label className={STYLES.label}>{t('configPanel.outputLanguageLabel')}</label>
          <div className="relative">
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              className={STYLES.select}
            >
              {LANGUAGE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{t(opt.labelKey)}</option>
              ))}
            </select>
            <div className="absolute right-3 top-3 pointer-events-none">
              <ChevronRight className="w-4 h-4 text-zinc-600 rotate-90" />
            </div>
          </div>
        </div>

        <OptionSelector
          label={t('configPanel.durationLabel')}
          options={durationOptions}
          value={duration}
          onChange={onDurationChange}
          customInput={customDurationInput}
          onCustomInputChange={onCustomDurationChange}
          customPlaceholder={t('configPanel.durationCustomPlaceholder')}
          gridCols={2}
        />

        <div className="space-y-2">
          <ModelSelector
            type="chat"
            value={model}
            onChange={onModelChange}
            disabled={isProcessing}
            label={t('configPanel.modelSelectorLabel')}
          />
          <p className="text-[9px] text-slate-500">
            <Trans i18nKey="configPanel.modelHint" ns="script">
              内置 GPT-5.2 / GPT-5.4，可在 <span className="text-cyan-300">模型配置</span> 中添加自定义对话模型
            </Trans>
          </p>
        </div>

        <OptionSelector
          label={t('configPanel.visualStyleLabel')}
          icon={<Wand2 className="w-3 h-3" />}
          options={visualStyleOptions}
          value={visualStyle}
          onChange={onVisualStyleChange}
          customInput={customStyleInput}
          onCustomInputChange={onCustomStyleChange}
          customPlaceholder={t('configPanel.visualStyleCustomPlaceholder')}
          gridCols={2}
        />
      </div>

      <div className="p-6 border-t border-white/10 bg-slate-950/70">
        <button
          onClick={onAnalyze}
          disabled={isProcessing}
          className={`w-full py-3.5 font-bold text-xs tracking-widest uppercase rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg ${
            isProcessing
              ? STYLES.button.disabled
              : STYLES.button.primary
          }`}
        >
          {isProcessing ? (
            <>
              <BrainCircuit className="w-4 h-4 animate-spin" />
              {t('configPanel.analyzeButton.analyzing')}
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              {t('configPanel.analyzeButton.generate')}
            </>
          )}
        </button>
        {error && (
          <div className="mt-4 p-3 bg-red-900/10 border border-red-900/50 text-red-500 text-xs rounded flex items-center gap-2">
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigPanel;
