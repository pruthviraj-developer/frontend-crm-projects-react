import React, { FC, Suspense } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { LightTheme } from '@hs/utils';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Loader } from '@hs-crm/components';
// import { ReactQueryDevtools } from 'react-query/devtools';


const Dashboard = React.lazy(() => import(/* webpackChunkName: 'finance' */ './components/finance-acc-dashboard'));
const VendorContract = React.lazy(() => import('./components/vendor-contract'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <ThemeProvider theme={LightTheme}>
          <MuiThemeProvider theme={LightTheme}>
            <Router basename="/react-monorepo/finance">
              <Switch>
                <Redirect exact from="/" to="/custom-duty" />
                <Route path="/custom-duty">
                  <Suspense fallback={<div>Loading...</div>}>
                    <Dashboard />
                  </Suspense>
                </Route>
                <Route path="/vendor/:vendorId/contracts">
                  <Suspense fallback={<Loader></Loader>}>
                    <VendorContract />
                  </Suspense>
                </Route>
              </Switch>
            </Router>
          </MuiThemeProvider>
        </ThemeProvider>
        <ToastContainer autoClose={10000} closeOnClick={false} draggable={false} newestOnTop={true} />
      </div>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default App;
