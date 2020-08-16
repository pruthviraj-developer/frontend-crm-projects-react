import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/styles';

import { ThemeProvider as StyledThemeProvider } from 'emotion-theming';

import { LightTheme } from '@hs/utils';

const StylesDecorator = (storyFn) => (
  <StylesProvider injectFirst>
    <CssBaseline />
    <StyledThemeProvider theme={LightTheme}>
      <MuiThemeProvider theme={LightTheme}>{storyFn()}</MuiThemeProvider>
    </StyledThemeProvider>
  </StylesProvider>
);

export default StylesDecorator;
