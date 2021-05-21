import React, { FC, Suspense } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { LightTheme } from '@hs/utils';
import './App.css';
import ProductSubType from './components/product-subtype/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const DashBoard = React.lazy(() => import(/* webpackChunkName: 'sos' */ './components/dashboard/Dashboard'));
const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <ThemeProvider theme={LightTheme}>
          <MuiThemeProvider theme={LightTheme}>
            <Router basename="/react-monorepo/merch">
              <Switch>
                <Redirect exact from="/" to="/sos" />
                <Route path="/products">
                  <ProductSubType />
                </Route>
                <Route path="/sos">
                  <Suspense fallback={<div>Loading...</div>}>
                    <DashBoard />
                  </Suspense>
                </Route>
                <Redirect to="/sos" />
              </Switch>
            </Router>
          </MuiThemeProvider>
        </ThemeProvider>
        <ToastContainer autoClose={10000} closeOnClick={false} draggable={false} newestOnTop={true} />
      </div>
    </QueryClientProvider>
  );
};

export default App;
