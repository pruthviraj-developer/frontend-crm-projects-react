import React, { FC, Suspense } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'emotion-theming';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { LightTheme } from '@hs/utils';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
const CreateCluster = React.lazy(() => import('./components/create-cluster'));
const DashBoard = React.lazy(() => import('./components/DashBoard'));

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <ThemeProvider theme={LightTheme}>
          <MuiThemeProvider theme={LightTheme}>
            <Router basename="/react-monorepo/reorder">
              <Switch>
                <Redirect exact from="/" to="/checks-and-balances" />
                <Route path="/checks-and-balances">
                  <Suspense fallback={<div>Loading...</div>}>
                    <DashBoard />
                  </Suspense>
                </Route>
                <Route path="/create-cluster">
                  <Suspense fallback={<div>Loading...</div>}>
                    <CreateCluster />
                  </Suspense>
                </Route>
                <Route path="*">
                  <Redirect to="/checks-and-balances" />
                </Route>
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
