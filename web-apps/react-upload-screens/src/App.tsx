import React, { FC, Suspense } from 'react';
import './App.css';
import { ThemeProvider } from 'emotion-theming';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LightTheme } from '@hs/utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Msku = React.lazy(() => import('./components/msku/Msku'));

const App: FC = () => {
  return (
    <div className="App">
      <ThemeProvider theme={LightTheme}>
        <MuiThemeProvider theme={LightTheme}>
          <Router basename="/react-monorepo/upload">
            <Switch>
              <Route path="/msku/:type">
                <Suspense fallback={<div>Loading...</div>}>
                  <Msku />
                </Suspense>
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
