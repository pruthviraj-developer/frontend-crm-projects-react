import React, { FC, Suspense } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'emotion-theming';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { LightTheme } from '@hs/utils';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();
const Clusters = React.lazy(() => import('./components/clusters'));
const ChecksAndBalanceDashBoard = React.lazy(() => import('./components/checks-and-balances/DashBoard'));

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <ThemeProvider theme={LightTheme}>
          <MuiThemeProvider theme={LightTheme}>
            <Router basename="/react-monorepo/reorder">
              <Switch>
                <Redirect exact from="/" to="/clusters" />
                <Route path="/checks-and-balances">
                  <Suspense fallback={<div>Loading...</div>}>
                    <ChecksAndBalanceDashBoard />
                  </Suspense>
                </Route>
                <Route path="/clusters">
                  <Suspense fallback={<div>Loading...</div>}>
                    <Clusters />
                  </Suspense>
                </Route>
                {/* <Route path="*">
                  <Redirect to="/checks-and-balances" />
                </Route> */}
              </Switch>
            </Router>
          </MuiThemeProvider>
        </ThemeProvider>
        <ToastContainer autoClose={10000} closeOnClick={false} draggable={false} newestOnTop={true} />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
