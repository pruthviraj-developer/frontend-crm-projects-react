import { configure, addParameters, addDecorator } from '@storybook/react';
import '@storybook/addon-console';
import { setConsoleOptions } from '@storybook/addon-console';
import StoryRouter from 'storybook-react-router';
import hsTheme from './hsTheme';
import StylesDecorator from './styles-decorator';
import ReinspectDecorator from './reinspect-decorator';

addDecorator(StoryRouter());
addDecorator(StylesDecorator);
addDecorator(ReinspectDecorator);

export const parameters = {
  docs: {
    theme: hsTheme,
  },
  backgrounds: {
    default: 'Hs-Content',
    values: [
      { name: 'Hs-Content', value: '#f5f5f5' },
      { name: 'HS-Dark', value: '#3e4855' },
      { name: 'HS-White', value: '#fff' },
    ],
  },
};
setConsoleOptions({
  panelExclude: [],
});
