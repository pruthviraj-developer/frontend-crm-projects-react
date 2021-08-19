import React, { FC } from 'react';
import { LeftNavBar, LeftNavBarProps } from '@hs-crm/components';
import { DashBoardIcon } from '@hs/icons';
import { Route, Switch } from 'react-router-dom';
import CreateCluster from './CreateCluster';
import Dashboard from './Dashboard';
const baseUrl = '/clusters';
const navItems: LeftNavBarProps = {
  navList: [
    { linkUrl: `${baseUrl}/create-cluster`, linkText: 'Create Casepack', icon: DashBoardIcon },
    { linkUrl: `${baseUrl}/dashboard`, linkText: 'Casepack Dashboard', icon: DashBoardIcon },
  ],
};

const Cluster: FC = () => {
  return (
    <>
      <LeftNavBar {...navItems}></LeftNavBar>
      <Switch>
        <Route path={`${baseUrl}/dashboard`}>
          <Dashboard />
        </Route>
        <Route path={`${baseUrl}/create-cluster`}>
          <CreateCluster header="Vendor casepack setup" key={'Create'} />
        </Route>
        <Route path={`${baseUrl}/edit-cluster/:id/:group_id`}>
          <CreateCluster header="Edit Vendor casepack setup" key={'Edit'} />
        </Route>
      </Switch>
    </>
  );
};

export default Cluster;
