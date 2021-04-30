import React, { FC, Suspense } from 'react';
import './App.css';
import { ThemeProvider } from 'emotion-theming';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { LightTheme } from '@hs/utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core';
const DashBoard = React.lazy(() => import('./components/DashBoard'));

const useStyles = makeStyles((theme) => ({
  toasterStyles: { fontFamily: 'inherit' },
}));

const App: FC = () => {
  const classes = useStyles();
  return (
    <div className="App">
      <ThemeProvider theme={LightTheme}>
        <MuiThemeProvider theme={LightTheme}>
          <Router basename="/react-monorepo/merch-intelligence">
            <Switch>
              <Redirect exact from="/" to="/dashboard" />
              <Route path="/dashboard">
                <Suspense fallback={<div>Loading...</div>}>
                  <DashBoard />
                </Suspense>
              </Route>
            </Switch>
          </Router>
        </MuiThemeProvider>
      </ThemeProvider>
      <ToastContainer
        autoClose={10000}
        toastClassName={classes.toasterStyles}
        closeOnClick={false}
        draggable={false}
        newestOnTop={true}
      />
    </div>
  );
};

export default App;
