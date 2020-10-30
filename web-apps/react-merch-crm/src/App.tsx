import React, { FC } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { DashBoardIcon, NonProcIcon } from '@hs/icons';
import { LightTheme } from '@hs/utils';
import './App.css';
import DashBoard from './components/dashboard/Dashboard';
import Merchandisers from './components/merchandisers/Merchandisers';
import { LeftNavBar, LeftNavBarProps } from '@hs/components';
import { NonProcurable } from './components/upload-screens/NonProcurable';

const App: FC = () => {
  const navItems: LeftNavBarProps = {
    navList: [
      { linkUrl: '/sosdashboard', linkText: 'SOS Dashboard', icon: DashBoardIcon },
      { linkUrl: '/merchandisers', linkText: 'Merchandisers', icon: DashBoardIcon },
      { linkUrl: '/mark-non-procurable', linkText: 'Mark Non-procurable', icon: NonProcIcon },
    ],
  };

  return (
    <div className="App">
      <ThemeProvider theme={LightTheme}>
        <MuiThemeProvider theme={LightTheme}>
          <Router basename="/react-monorepo/merch">
            <LeftNavBar {...navItems}></LeftNavBar>
            <Switch>
              <Redirect exact from="/" to="/sosdashboard" />
              <Route path="/sosdashboard">
                <DashBoard />
              </Route>
              <Route path="/merchandisers">
                <Merchandisers />
              </Route>
              <Route path="/mark-non-procurable">
                <NonProcurable />
              </Route>
            </Switch>
          </Router>
        </MuiThemeProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
