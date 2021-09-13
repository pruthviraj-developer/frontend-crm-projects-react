//import { configure, addParameters } from '@storybook/react';
import '@storybook/addon-console';
import { setConsoleOptions } from '@storybook/addon-console';
import StoryRouter from 'storybook-react-router';
import hsTheme from './hsTheme';
import { muiTheme } from 'storybook-addon-material-ui';
import { LightTheme } from '@hs/utils';
import { DarkTheme } from '@hs/utils';
import { RouterContext } from 'next/dist/shared/lib/router-context'; // next 11.2

// import ReinspectDecorator from './reinspect-decorator';

export const decorators = [StoryRouter(), muiTheme([LightTheme, DarkTheme])];
// addDecorator();
// addDecorator(StylesDecorator);
// addDecorator(ReinspectDecorator);

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
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};
setConsoleOptions({
  panelExclude: [],
});
