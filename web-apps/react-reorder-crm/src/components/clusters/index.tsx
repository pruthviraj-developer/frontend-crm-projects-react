import React, { FC } from 'react';
import { LeftNavBar, LeftNavBarProps } from '@hs/components';
import { DashBoardIcon } from '@hs/icons';
import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateCluster from './CreateCluster';
import Dashboard from './Dashboard';
const navItems: LeftNavBarProps = {
  navList: [
    { linkUrl: 'create-cluster', linkText: 'Create clusterx', icon: DashBoardIcon },
    { linkUrl: 'clusters', linkText: 'Reorder Dashboard', icon: DashBoardIcon },
  ],
};

const Cluster: FC = () => {
  return (
    <>
      <LeftNavBar {...navItems}></LeftNavBar>
      <Switch>
        <Route path="/">
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </Suspense>
        </Route>
        <Route path="/create-cluster">
          <Suspense fallback={<div>Loading...</div>}>
            <CreateCluster />
          </Suspense>
        </Route>
        <Route path="/edit-cluster/:id/:group_id">
          <Suspense fallback={<div>Loading...</div>}>
            <CreateCluster />
          </Suspense>
        </Route>
      </Switch>
    </>
  );
};

export default Cluster;
