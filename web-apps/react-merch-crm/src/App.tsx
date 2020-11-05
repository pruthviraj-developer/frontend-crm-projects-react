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
import { NonProcurable, NonProcurableCurrentVendor } from './components/upload-screens';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: FC = () => {
  const navItems: LeftNavBarProps = {
    navList: [
      { linkUrl: '/sosdashboard', linkText: 'SOS Dashboard', icon: DashBoardIcon },
      { linkUrl: '/merchandisers', linkText: 'Merchandisers', icon: DashBoardIcon },
      { linkUrl: '/mark-non-procurable', linkText: 'Mark Non-procurable', icon: NonProcIcon },
      {
        linkUrl: '/mark-non-procurable-current-vendor',
        linkText: 'Mark current vendor Non-procurable',
        icon: NonProcIcon,
      },
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
              <Route path="/mark-non-procurable-current-vendor">
                <NonProcurableCurrentVendor />
              </Route>
            </Switch>
          </Router>
        </MuiThemeProvider>
      </ThemeProvider>
      <ToastContainer />
    </div>
  );
};

export default App;
