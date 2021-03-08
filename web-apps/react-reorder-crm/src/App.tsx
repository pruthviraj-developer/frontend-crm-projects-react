import React, { FC } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'emotion-theming';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { LightTheme } from '@hs/utils';
import { LeftNavBar, LeftNavBarProps } from '@hs/components';
import { ToastContainer } from 'react-toastify';
import { DashBoardIcon } from '@hs/icons';
import { DashBoard } from './components/DashBoard';
import { Clusters } from './components/Clusters';

const App: FC = () => {
  const navItems: LeftNavBarProps = {
    navList: [
      { linkUrl: '/checks-and-balances', linkText: 'Dashboard', icon: DashBoardIcon },
      { linkUrl: '/clu', linkText: 'Clusters', icon: DashBoardIcon },
    ],
  };
  return (
    <div className="App">
      <ThemeProvider theme={LightTheme}>
        <MuiThemeProvider theme={LightTheme}>
          <Router basename="/react-monorepo/reorder-checks-and-balances">
            <LeftNavBar {...navItems}></LeftNavBar>
            <Switch>
              <Redirect exact from="/" to="/checks-and-balances" />
              <Route path="/checks-and-balances">
                <DashBoard />
              </Route>
              <Route path="/clu">
                <Clusters />
              </Route>
            </Switch>
          </Router>
        </MuiThemeProvider>
      </ThemeProvider>
      <ToastContainer autoClose={10000} closeOnClick={false} draggable={false} newestOnTop={true} />
    </div>
  );
};

export default App;
