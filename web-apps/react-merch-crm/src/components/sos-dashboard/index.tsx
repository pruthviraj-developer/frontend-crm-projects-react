import React, { FC } from 'react';
import { Route, Redirect, Switch, useRouteMatch } from 'react-router-dom';
import { DashBoardIcon, NonProcIcon, TransferIcon } from '@hs/icons';

import { LeftNavBar, LeftNavBarProps } from '@hs/components';
import Merchandisers from '../merchandisers/Merchandisers';
import SosDashboard from './sos-dashboard';
import {
  NonProcurable,
  NonProcurableCurrentVendor,
  TransferVendor,
  TransferVendorWithRevisedData,
} from '../upload-screens';
const navItems: LeftNavBarProps = {
  navList: [
    { linkUrl: '/sos/sos-dashboard', linkText: 'SOS Dashboard', icon: DashBoardIcon },
    { linkUrl: '/sos/merchandisers', linkText: 'Merchandisers', icon: DashBoardIcon },
    { linkUrl: '/sos/mark-non-procurable', linkText: 'Mark Non-procurable', icon: NonProcIcon },
    { linkUrl: '/sos/modify-fulfillment-status', linkText: 'Modify Fulfillment Status', icon: NonProcIcon },
    { linkUrl: '/sos/transfer-pid', linkText: 'Transfer PID : No Modification', icon: TransferIcon },
    { linkUrl: '/sos/transfer-revised-pids', linkText: 'Transfer PID : Modify Details', icon: TransferIcon },
  ],
};

const Dashboard: FC = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <LeftNavBar {...navItems}></LeftNavBar>
      <Switch>
        <Redirect exact from="/sos" to="/sos/sos-dashboard" />
        <Route path={`${path}/merchandisers`}>
          <Merchandisers header="Merchandisers Dashboard" />
        </Route>
        <Route path={`${path}/mark-non-procurable`}>
          <NonProcurable header="Mark NonProcurable" />
        </Route>
        <Route path={`${path}/modify-fulfillment-status`}>
          <NonProcurableCurrentVendor header="Modify Fulfillment Status" />
        </Route>
        <Route path={`${path}/transfer-pid`}>
          <TransferVendor header="Transfer PID to New Vendor: No Details Modification" />
        </Route>
        <Route path={`${path}/transfer-revised-pids`}>
          <TransferVendorWithRevisedData header="Transfer PID to New Vendor: Modify PID details" />
        </Route>
        <Route path={`${path}/sos-dashboard`}>
          <SosDashboard header="Sos Dashboard" />
        </Route>
        <Redirect to="/sos/sos-dashboard" />
      </Switch>
    </>
  );
};
export default Dashboard;
