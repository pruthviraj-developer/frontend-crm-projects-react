import { configure, addParameters } from '@storybook/react';
addParameters({
  backgrounds: [
    { name: 'Hs-Content', value: '#f5f5f5', default: true },
    { name: 'HS-Dark', value: '#3e4855' },
    { name: 'HS-White', value: '#fff' },
  ],
});
configure(require.context('../src/', true, /\.stories\.(ts|tsx)$/), module);
