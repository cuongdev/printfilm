import { Scene } from '../../types';

export const getFinalValue = (selected: string, customInput: string): string => {
  return selected === 'custom' ? customInput : selected;
};

export const deduplicateScenes = (scenes: Scene[] = []): Scene[] => {
  const seenLocations = new Set<string>();
  return scenes.filter(scene => {
    const normalizedLoc = scene.location.trim().toLowerCase();
    if (seenLocations.has(normalizedLoc)) {
      return false;
    }
    seenLocations.add(normalizedLoc);
    return true;
  });
};

export const getTextStats = (text: string) => {
  return {
    characters: text.length,
    lines: text.split('\n').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0
  };
};

export const validateConfig = (config: {
  script: string;
  duration: string;
  model: string;
  visualStyle: string;
}): { valid: boolean; errorKey: string | null } => {
  if (!config.script.trim()) {
    return { valid: false, errorKey: 'errors.scriptContentRequired' };
  }
  if (!config.duration) {
    return { valid: false, errorKey: 'errors.durationRequired' };
  }
  if (!config.model) {
    return { valid: false, errorKey: 'errors.modelRequired' };
  }
  if (!config.visualStyle) {
    return { valid: false, errorKey: 'errors.visualStyleRequired' };
  }
  return { valid: true, errorKey: null };
};
