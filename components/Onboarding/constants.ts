// Onboarding 常量配置

export const ONBOARDING_STORAGE_KEY = 'ai_manga_studio_onboarding_completed';
export const LEGACY_ONBOARDING_STORAGE_KEY = ['big' + 'banana', 'onboarding', 'completed'].join('_');

export const ONBOARDING_PAGES = {
  WELCOME: 0,
  WORKFLOW: 1,
  HIGHLIGHTS: 2,
  API_KEY: 3,
  ACTION: 4,
} as const;

export const TOTAL_PAGES = 5;

// 工作流步骤
export const WORKFLOW_STEPS = [
  {
    number: '①',
    labelKey: 'workflowSteps.script.label',
    descKey: 'workflowSteps.script.desc',
  },
  {
    number: '②',
    labelKey: 'workflowSteps.character.label',
    descKey: 'workflowSteps.character.desc',
  },
  {
    number: '③',
    labelKey: 'workflowSteps.storyboard.label',
    descKey: 'workflowSteps.storyboard.desc',
  },
  {
    number: '④',
    labelKey: 'workflowSteps.export.label',
    descKey: 'workflowSteps.export.desc',
  },
] as const;

// 核心亮点
export const HIGHLIGHTS = [
  {
    icon: '🎬',
    labelKey: 'highlights.frameLock.label',
    descKey: 'highlights.frameLock.desc',
  },
  {
    icon: '👔',
    labelKey: 'highlights.wardrobe.label',
    descKey: 'highlights.wardrobe.desc',
  },
  {
    icon: '🎨',
    labelKey: 'highlights.styleConsistency.label',
    descKey: 'highlights.styleConsistency.desc',
  },
] as const;

// 快速开始选项
export const QUICK_START_OPTIONS = [
  {
    id: 'script',
    icon: '📝',
    labelKey: 'quickStart.script.label',
    descKey: 'quickStart.script.desc',
  },
  {
    id: 'example',
    icon: '🎬',
    labelKey: 'quickStart.example.label',
    descKey: 'quickStart.example.desc',
  },
] as const;
