export const DURATION_OPTIONS = [
  { labelKey: 'options.duration.thirtySec', value: '30s' },
  { labelKey: 'options.duration.sixtySec', value: '60s' },
  { labelKey: 'options.duration.twoMin', value: '120s' },
  { labelKey: 'options.duration.fiveMin', value: '300s' },
  { labelKey: 'options.duration.fifteenMin', value: '900s' },
  { labelKey: 'options.duration.custom', value: 'custom' }
];

export const LANGUAGE_OPTIONS = [
  { labelKey: 'options.language.chinese', value: '中文' },
  { labelKey: 'options.language.english', value: 'English' },
  { labelKey: 'options.language.japanese', value: 'Japanese' },
  { labelKey: 'options.language.french', value: 'French' },
  { labelKey: 'options.language.spanish', value: 'Spanish' }
];

export const VISUAL_STYLE_OPTIONS = [
  { labelKey: 'options.visualStyle.anime.label', value: 'anime', descKey: 'options.visualStyle.anime.desc' },
  { labelKey: 'options.visualStyle.animation2d.label', value: '2d-animation', descKey: 'options.visualStyle.animation2d.desc' },
  { labelKey: 'options.visualStyle.animation3d.label', value: '3d-animation', descKey: 'options.visualStyle.animation3d.desc' },
  { labelKey: 'options.visualStyle.cyberpunk.label', value: 'cyberpunk', descKey: 'options.visualStyle.cyberpunk.desc' },
  { labelKey: 'options.visualStyle.oilPainting.label', value: 'oil-painting', descKey: 'options.visualStyle.oilPainting.desc' },
  { labelKey: 'options.visualStyle.liveAction.label', value: 'live-action', descKey: 'options.visualStyle.liveAction.desc' },
  { labelKey: 'options.visualStyle.custom.label', value: 'custom', descKey: 'options.visualStyle.custom.desc' }
];

export const STYLES = {
  input: 'w-full bg-white/[0.06] border border-white/10 text-white px-3 py-2.5 text-sm rounded-xl focus:border-cyan-300/40 focus:outline-none focus:ring-2 focus:ring-cyan-300/10 transition-all placeholder:text-slate-500',
  label: 'text-[10px] font-bold text-cyan-100/55 uppercase tracking-widest',
  select: 'w-full bg-white/[0.06] border border-white/10 text-white px-3 py-2.5 text-sm rounded-xl appearance-none focus:border-cyan-300/40 focus:outline-none transition-all cursor-pointer',
  button: {
    primary: 'bg-gradient-to-r from-cyan-300 to-sky-400 text-slate-950 hover:from-cyan-200 hover:to-sky-300 shadow-lg shadow-cyan-500/20',
    secondary: 'bg-white/[0.04] border-white/10 text-slate-400 hover:border-cyan-300/30 hover:text-cyan-50',
    selected: 'bg-cyan-300 text-slate-950 border-cyan-300 shadow-sm shadow-cyan-500/20',
    disabled: 'bg-white/[0.05] text-slate-500 cursor-not-allowed border-white/10'
  },
  editor: {
    textarea: 'w-full bg-white/[0.06] border border-white/10 text-slate-200 px-3 py-2 text-sm rounded-xl focus:border-cyan-300/40 focus:outline-none resize-none',
    mono: 'font-mono',
    serif: 'font-serif italic'
  }
};

export const DEFAULTS = {
  duration: '60s',
  language: '中文',
  model: 'gpt-5.2',
  visualStyle: 'live-action'
};
