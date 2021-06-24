import React, { FC } from 'react';
import { Route, Redirect, Switch, useRouteMatch } from 'react-router-dom';
import { DashBoardIcon } from '@hs/icons';
import { LeftNavBar, LeftNavBarProps } from '@hs/components';
import ShareToVendor from './ShareToVendor';

const navItems: LeftNavBarProps = {
  navList: [
    {
      linkUrl: '/buyer/buyer-dashboard',
      linkText: 'Buyer Dashboard',
      icon: DashBoardIcon,
    },
    {
      linkUrl: '/buyer/share',
      linkText: 'Share to vendor',
      icon: DashBoardIcon,
    },
  ],
};

const BuyerDashboard: FC = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <LeftNavBar {...navItems}></LeftNavBar>
      <Switch>
        <Redirect exact from="/buyer" to="/buyer/buyer-dashboard" />
        <Route path={`${path}/dashboard`}>
          <h5>Dashboard</h5>
        </Route>
        <Route path={`${path}/share`}>
          <h5>
            <ShareToVendor />
          </h5>
        </Route>
        <Redirect to="/buyer/buyer-dashboard" />
      </Switch>
    </>
  );
};
export default BuyerDashboard;
