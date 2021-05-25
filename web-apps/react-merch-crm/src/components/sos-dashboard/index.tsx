import React, { FC } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
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
    { linkUrl: '/sos/sosdashboard', linkText: 'SOS Dashboard', icon: DashBoardIcon },
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
        <Redirect exact from="/sos" to="/sos/sosdashboard" />
        <Route path={`${path}/merchandisers`}>
          <Merchandisers />
        </Route>
        <Route path={`${path}/mark-non-procurable`}>
          <NonProcurable />
        </Route>
        <Route path={`${path}/modify-fulfillment-status`}>
          <NonProcurableCurrentVendor />
        </Route>
        <Route path={`${path}/transfer-pid`}>
          <TransferVendor />
        </Route>
        <Route path={`${path}/transfer-revised-pids`}>
          <TransferVendorWithRevisedData />
        </Route>
        <Route path={`${path}/sosdashboard`}>
          <SosDashboard />
        </Route>
      </Switch>
    </>
  );
};
export default Dashboard;
