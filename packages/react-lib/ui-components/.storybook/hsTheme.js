import { create } from '@storybook/theming/create';

export default create({
  base: 'light',

  colorPrimary: '#ed54a4',
  colorSecondary: '#777',

  // UI
  appBg: 'white',
  appContentBg: '#f5f5f5',
  appBorderColor: '#BDBDBD',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#362f37',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: '#f1f1f1',
  barSelectedColor: '#f1f1f5',
  barBg: '#ed54a4',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: '#362f37',
  inputBorderRadius: 4,

  brandTitle: 'HopScotch',
  brandUrl: 'https://www.hopscotch.in/',
  brandImage: 'https://static.hopscotch.in/web2/images/hs-logo.png',
});
