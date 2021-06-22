import React, { FC, Suspense } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { LightTheme } from '@hs/utils';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const Dashboard = React.lazy(() => import(/* webpackChunkName: 'sos' */ './components/sos-dashboard'));
const ProductSubType = React.lazy(
  () => import(/* webpackChunkName: 'product-sub-type' */ './components/product-sub-type'),
);
const BuyerDashboard = React.lazy(
  () => import(/* webpackChunkName: 'product-sub-type' */ './components/buyer-dashboard'),
);
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
            <Router basename="/react-monorepo/merch">
              <Switch>
                <Redirect exact from="/" to="/product-sub-types" />
                <Route path="/product-sub-types">
                  <Suspense fallback={<div>Loading...</div>}>
                    <ProductSubType />
                  </Suspense>
                </Route>
                <Route path="/sos">
                  <Suspense fallback={<div>Loading...</div>}>
                    <Dashboard />
                  </Suspense>
                </Route>
                <Route path="/buyer">
                  <Suspense fallback={<div>Loading...</div>}>
                    <BuyerDashboard />
                  </Suspense>
                </Route>
                <Redirect to="/sos" />
              </Switch>
            </Router>
          </MuiThemeProvider>
        </ThemeProvider>
        <ToastContainer
          autoClose={10000}
          closeOnClick={false}
          draggable={false}
          newestOnTop={true}
          style={{ fontSize: '1rem' }}
        />
      </div>
    </QueryClientProvider>
  );
};

export default App;
