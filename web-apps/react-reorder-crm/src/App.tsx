import React, { FC } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'emotion-theming';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LightTheme } from '@hs/utils';
import { LeftNavBar, LeftNavBarProps } from '@hs/components';
import { ToastContainer } from 'react-toastify';
import { DashBoardIcon } from '@hs/icons';
import { DashBoard } from './components/DashBoard';

const App: FC = () => {
  const navItems: LeftNavBarProps = {
    navList: [{ linkUrl: '/', linkText: 'Dashboard', icon: DashBoardIcon }],
  };
  return (
    <div className="App">
      <ThemeProvider theme={LightTheme}>
        <MuiThemeProvider theme={LightTheme}>
          <Router basename="/react-monorepo/reorder-checks-and-balances">
            <LeftNavBar {...navItems}></LeftNavBar>
            <Switch>
              <Route path="/">
                <DashBoard />
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
