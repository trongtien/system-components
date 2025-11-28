import { create } from '@storybook/theming';

export default create({
  base: 'light',
  brandTitle: 'System Components',
  brandUrl: 'https://github.com/trongtien/system-components',
  brandTarget: '_blank',

  // UI
  appBg: '#f5f5f5',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#d9d9d9',
  appBorderRadius: 6,

  // Typography
  fontBase: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontCode: 'Monaco, Menlo, Consolas, "Courier New", monospace',

  // Text colors
  textColor: 'rgba(0, 0, 0, 0.88)',
  textInverseColor: '#ffffff',
  textMutedColor: 'rgba(0, 0, 0, 0.65)',

  // Toolbar default and active colors
  barTextColor: 'rgba(0, 0, 0, 0.65)',
  barSelectedColor: '#1677ff',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#d9d9d9',
  inputTextColor: 'rgba(0, 0, 0, 0.88)',
  inputBorderRadius: 6,

  // Brand colors
  colorPrimary: '#1677ff',
  colorSecondary: '#4096ff',
});
