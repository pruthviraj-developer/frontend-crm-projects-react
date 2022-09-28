import { LeftNavBar, LeftNavBarProps } from '@hs-crm/components';
import React, { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import { DashBoardIcon } from '@hs/icons';
import DashBoard from './dashboard/DashBoard';
import Summary from './summary/Summary';

const ReversePickup: FC = () => {
  const { path } = useRouteMatch();

  const navItems: LeftNavBarProps = {
    navList: [
      { linkUrl: '/reverse-pickup/hopscotch', linkText: 'Hopscotch', icon: DashBoardIcon },
      { linkUrl: '/reverse-pickup/marketplace', linkText: 'Market Place', icon: DashBoardIcon },
      { linkUrl: '/reverse-pickup/summary', linkText: 'Return Summary', icon: DashBoardIcon },
    ],
  };
  return (
    <>
      <LeftNavBar {...navItems}></LeftNavBar>
      <Switch>
        <Redirect exact from="/reverse-pickup" to="/reverse-pickup/hopscotch" />
        <Route path={`${path}/hopscotch`}>
          <DashBoard header="Hopscotch" />
        </Route>
        <Route path={`${path}/marketplace`}>
          <DashBoard header="Marketplace" />
        </Route>
        <Route path={`${path}/summary`}>
          <Summary header="Return Summary" />
        </Route>
      </Switch>
    </>
  );
};

export default ReversePickup;
