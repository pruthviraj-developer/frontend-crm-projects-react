import { configure, addParameters } from '@storybook/react';
import '@storybook/addon-console';
import { setConsoleOptions } from '@storybook/addon-console';
import hsTheme from './hsTheme';
addParameters({
  options: {
    theme: hsTheme,
  },
  backgrounds: [
    { name: 'Hs-Content', value: '#f5f5f5', default: true },
    { name: 'HS-Dark', value: '#3e4855' },
    { name: 'HS-White', value: '#fff' },
  ],
});
configure(require.context('../src/', true, /\.stories\.(ts|tsx)$/), module);
setConsoleOptions({
  panelExclude: [],
});
