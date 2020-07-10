import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';
import hsTheme from './hsTheme';
addons.setConfig({
  //   theme: themes.dark,
  theme: hsTheme,
});
