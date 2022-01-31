import React, { FC } from 'react';
import { Route, Redirect, Switch, useRouteMatch } from 'react-router-dom';
import { DashBoardIcon } from '@hs/icons';
import { LeftNavBar, LeftNavBarProps } from '@hs-crm/components';
import ShareToVendor from './ShareToVendor';
import Dashboard from './Dashboard';
import Images from './Images';

const navItems: LeftNavBarProps = {
  navList: [
    {
      linkUrl: '/buyer/dashboard',
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
        <Redirect exact from="/buyer" to="/buyer/dashboard" />
        <Route path={`${path}/dashboard`}>
          <Dashboard header={'Buyer dashboard'} />
        </Route>
        <Route path={`${path}/share`}>
          <ShareToVendor header={'Share to vendor'} />
        </Route>
        <Route path={`${path}/images/:pid`}>
          <Images header={'Upload Images'} />
        </Route>
        <Redirect to="/buyer/dashboard" />
      </Switch>
    </>
  );
};
export default BuyerDashboard;
