export const SUPPORTED_LANGUAGES = ['zh-CN', 'en', 'vi'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const FALLBACK: SupportedLanguage = 'zh-CN';

/** Chuẩn hóa locale bất kỳ (vd 'en-US', 'zh-TW', 'vi-VN') về 1 trong 3 ngôn ngữ hỗ trợ. */
export function normalizeLanguage(lng?: string | null): SupportedLanguage {
  if (!lng) return FALLBACK;
  const lower = lng.toLowerCase();
  if (lower.startsWith('vi')) return 'vi';
  if (lower.startsWith('zh')) return 'zh-CN';
  if (lower.startsWith('en')) return 'en';
  return FALLBACK;
}
