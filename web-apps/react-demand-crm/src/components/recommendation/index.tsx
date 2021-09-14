import React, { FC } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LeftNavBar, LeftNavBarProps } from '@hs/components';
import { DashBoardIcon, ArchiveIcon, CreateIcon } from '@hs/icons';
import DashBoard from './dashboard/DashBoard';
import ArchivedDashboard from './dashboard/ArchivedDashBoard';

import AddEdit from './create/AddEdit';
const navItems: LeftNavBarProps = {
  navList: [
    { linkUrl: '/recommendation/dashboard', linkText: 'Models', icon: DashBoardIcon },
    { linkUrl: '/recommendation/archive/dashboard', linkText: 'Archived Models', icon: ArchiveIcon },
    { linkUrl: '/recommendation/add', linkText: 'Create Model', icon: CreateIcon },
  ],
};

const Recommendation: FC = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <LeftNavBar {...navItems}></LeftNavBar>
      <Switch>
        <Redirect exact from="/recommendation" to="/recommendation/dashboard" />
        <Route path={`${path}/dashboard`}>
          <DashBoard header={'Models'} />
        </Route>
        <Route path={`${path}/archive/dashboard`}>
          <ArchivedDashboard header={'Archived Models'} />
        </Route>
        <Route path={`${path}/add`}>
          <AddEdit header={'Create Model'} />
        </Route>
        <Route path={`${path}/edit/:id`}>
          <AddEdit header={'Update Model'} />
        </Route>
      </Switch>
    </>
  );
};

export default Recommendation;
