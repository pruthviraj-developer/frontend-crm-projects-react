import React, { FC, Suspense } from 'react';
import './App.css';
import { ThemeProvider } from 'emotion-theming';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { LightTheme } from '@hs/utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
import { Loader } from '@hs-crm/components';

// const DashBoard = React.lazy(() => import('./components/Dashboard'));
//const MIPDashboardListing = React.lazy(() => import('./components/mip-dashboard-listing'));
//const MIPDashboard = React.lazy(() => import('./components/mip-dashboard'));
const MipLanding = React.lazy(() => import('./components/mip-landing'));
const PidReview = React.lazy(() => import('./components/pid-review'));

const queryClient = new QueryClient();

const useStyles = makeStyles((theme) => ({
  toasterStyles: { fontFamily: 'inherit' },
}));

const App: FC = () => {
  const classes = useStyles();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <ThemeProvider theme={LightTheme}>
          <MuiThemeProvider theme={LightTheme}>
            <Router basename="/react-monorepo/merch-intelligence">
              <Switch>
                <Redirect exact from="/" to="/dashboard" />
                {/* <Route path="/dashboard">
                <Suspense fallback={<div>Loading...</div>}>
                  <DashBoard />
                </Suspense>
              </Route> */}
                {/* <Route exact={true} path="/dashboard1">
                  <Suspense fallback={<Loader></Loader>}>
                    <MIPDashboard />
                  </Suspense>
                </Route>
                <Route path="/dashboard1/:page">
                  <Suspense fallback={<Loader></Loader>}>
                    <MIPDashboard />
                  </Suspense>
                </Route>
                <Route path="/msku-listing/:id">
                  <Suspense fallback={<Loader></Loader>}>
                    <MIPDashboardListing />
                  </Suspense>
                </Route> */}
                <Route path="/dashboard">
                  <Suspense fallback={<Loader></Loader>}>
                    <MipLanding />
                  </Suspense>
                </Route>
                <Route path="/pid-review/:id/:gender/:pstName">
                  <Suspense fallback={<Loader></Loader>}>
                    <PidReview />
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
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default App;
