import React, { FC } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { DashBoardIcon, NonProcIcon, TransferIcon } from '@hs/icons';
import { LightTheme } from '@hs/utils';
import './App.css';
import DashBoard from './components/dashboard/Dashboard';
import Merchandisers from './components/merchandisers/Merchandisers';
import ProductSubType from './components/product-subtype/Dashboard';
import { LeftNavBar, LeftNavBarProps } from '@hs/components';
import {
  NonProcurable,
  NonProcurableCurrentVendor,
  TransferVendor,
  TransferVendorWithRevisedData,
} from './components/upload-screens';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App: FC = () => {
  const navItems: LeftNavBarProps = {
    navList: [
      { linkUrl: '/sosdashboard', linkText: 'SOS Dashboard', icon: DashBoardIcon },
      { linkUrl: '/merchandisers', linkText: 'Merchandisers', icon: DashBoardIcon },
      { linkUrl: '/product-subtype', linkText: 'Product SubType Dashboard', icon: DashBoardIcon },
      { linkUrl: '/mark-non-procurable', linkText: 'Mark Non-procurable', icon: NonProcIcon },
      {
        linkUrl: '/modify-fulfillment-status',
        linkText: 'Modify Fulfillment Status',
        icon: NonProcIcon,
      },
      { linkUrl: '/transfer-pid', linkText: 'Transfer PID : No Modification', icon: TransferIcon },
      { linkUrl: '/transfer-revised-pids', linkText: 'Transfer PID : Modify Details', icon: TransferIcon },
    ],
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <ThemeProvider theme={LightTheme}>
          <MuiThemeProvider theme={LightTheme}>
            <Router basename="/react-monorepo/merch">
              <LeftNavBar {...navItems}></LeftNavBar>
              <Switch>
                <Redirect exact from="/" to="/sosdashboard" />
                <Route path="/sosdashboard">
                  <DashBoard />
                </Route>
                <Route path="/merchandisers">
                  <Merchandisers />
                </Route>
                <Route path="/product-subtype">
                  <ProductSubType />
                </Route>
                <Route path="/mark-non-procurable">
                  <NonProcurable />
                </Route>
                <Route path="/modify-fulfillment-status">
                  <NonProcurableCurrentVendor />
                </Route>
                <Route path="/transfer-pid">
                  <TransferVendor />
                </Route>
                <Route path="/transfer-revised-pids">
                  <TransferVendorWithRevisedData />
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
