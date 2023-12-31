import React, { FC, Suspense } from 'react';
import './App.css';
import { ThemeProvider } from 'emotion-theming';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LightTheme } from '@hs/utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MskuUpload = React.lazy(() => import(/* webpackChunkName: "msku-upload" */ './components/msku/MskuUpload'));
const ForecastAndCapitalBudget = React.lazy(
  () => import(/* webpackChunkName: "forecast" */ './components/forecast-capitalbudget/ForecastAndCapitalBudget'),
);
const MskuTargetDownload = React.lazy(
  () => import(/* webpackChunkName: "msku-target" */ './components/mskuTargetDownload/MskuTargetDownload'),
);

const ShipmentIdCreation = React.lazy(() => import('./components/shipmentIdCreation/ShipmentIdCreation'));

const EddVendorUpdate = React.lazy(() => import('./components/edd-vendor/EddVendorUpdate'));

const App: FC = () => {
  return (
    <div className="App">
      <ThemeProvider theme={LightTheme}>
        <MuiThemeProvider theme={LightTheme}>
          <Router basename="/react-monorepo/upload">
            <Switch>
              <Route path="/msku">
                <Suspense fallback={<div>Loading...</div>}>
                  <MskuUpload />
                </Suspense>
              </Route>
              <Route path="/bulk-upload">
                <Suspense fallback={<div>Loading...</div>}>
                  <ForecastAndCapitalBudget />
                </Suspense>
              </Route>
              <Route path="/mskuTargetDownload">
                <Suspense fallback={<div>Loading...</div>}>
                  <MskuTargetDownload
                    header={'MSKU Catalog requirement Targets'}
                    getSheetAction={'downloadDiscoveryTargetCalculation'}
                    getUrlAction={'getUrlBySheetKey'}
                    downloadOption={'Download latest file'}
                  />
                </Suspense>
              </Route>
              <Route path="/shipmentIdCreation">
                <Suspense fallback={<div>Loading...</div>}>
                  <ShipmentIdCreation header={'ShipmentId Creation Upload'} />
                </Suspense>
              </Route>
              <Route path="/edd-vendor">
                <Suspense fallback={<div>Loading...</div>}>
                  <EddVendorUpdate />
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
