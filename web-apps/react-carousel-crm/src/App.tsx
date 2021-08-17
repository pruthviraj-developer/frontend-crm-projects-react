import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { LeftNavBar, LeftNavBarProps } from '@hs-crm/components';
import { DashBoardIcon, CreateIcon, ArchiveIcon, FAQIcon } from '@hs/icons';
import { LightTheme } from '@hs/utils';
import './App.css';
import DashBoard from './components/dashboard/DashBoard';
import CarouselCreator from './components/creator/CarouselCreator';
import { FAQScreen } from './components/faq-section/FAQScreen';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function App() {
  const navItems: LeftNavBarProps = {
    navList: [
      { linkUrl: '/dashboard', linkText: 'Dashboard', icon: DashBoardIcon },
      { linkUrl: '/create-carousel', linkText: 'Create', icon: CreateIcon },
      { linkUrl: '/archivedlist', linkText: 'ArchivedLit', icon: ArchiveIcon },
      { linkUrl: '/faq', linkText: 'FAQ', icon: FAQIcon },
    ],
  };

  return (
    <div className="App">
      <ThemeProvider theme={LightTheme}>
        <MuiThemeProvider theme={LightTheme}>
          <Router basename="/react-monorepo/PageCarousel">
            <LeftNavBar {...navItems}></LeftNavBar>
            <Switch>
              <Redirect exact from="/" to="/dashboard" />
              <Route path="/dashboard">
                <DashBoard />
              </Route>
              <Route path="/create-carousel">
                <CarouselCreator />
              </Route>
              <Route path="/edit-carousel/:id">
                <CarouselCreator />
              </Route>
              <Route path="/archivedlist">
                <DashBoard />
              </Route>
              <Route path="/faq">
                <FAQScreen />
              </Route>
            </Switch>
          </Router>
        </MuiThemeProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
