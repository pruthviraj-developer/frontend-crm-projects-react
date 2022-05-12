import React, { FC, Suspense } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'emotion-theming';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { LightTheme } from '@hs/utils';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
//import { ReactQueryDevtools } from 'react-query/devtools';
import { Loader } from '@hs-crm/components';

const queryClient = new QueryClient();
const Recommendation = React.lazy(() => import('./components/recommendation'));
const ReversePickup = React.lazy(() => import('./components/reverse-pickup'));

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <ThemeProvider theme={LightTheme}>
          <MuiThemeProvider theme={LightTheme}>
            <Router basename="/react-monorepo/demand">
              <Switch>
                <Redirect exact from="/" to="/reverse-pickup" />
                <Route path="/recommendation">
                  <Suspense fallback={<Loader />}>
                    <Recommendation />
                  </Suspense>
                </Route>
                <Route path="/reverse-pickup">
                  <Suspense fallback={<Loader />}>
                    <ReversePickup />
                  </Suspense>
                </Route>
                {/* <Route path="*">
                  <Redirect to="/checks-and-balances" />
                </Route> */}
              </Switch>
            </Router>
          </MuiThemeProvider>
        </ThemeProvider>
        <ToastContainer
          autoClose={10000}
          closeOnClick={false}
          draggable={false}
          newestOnTop={true}
          style={{ width: '500px' }}
        />
      </div>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default App;
