import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { LeftNavBar, LeftNavBarProps } from '@hs/components';
import { DashBoardIcon } from '@hs/icons';
import { LightTheme } from '@hs/utils';
import './App.css';
import DashBoard from './components/dashboard/DashboardV1';

function App() {
  const navItems: LeftNavBarProps = {
    navList: [{ linkUrl: '/dashboard', linkText: 'Dashboard', icon: DashBoardIcon }],
  };

  return (
    <div className="App">
      <ThemeProvider theme={LightTheme}>
        <MuiThemeProvider theme={LightTheme}>
          <Router basename="/react-monorepo/sos">
            <LeftNavBar {...navItems}></LeftNavBar>
            <Switch>
              <Redirect exact from="/" to="/dashboard" />
              <Route path="/dashboard">
                <DashBoard />
              </Route>
            </Switch>
          </Router>
        </MuiThemeProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
