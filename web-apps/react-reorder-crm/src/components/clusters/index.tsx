import React, { FC } from 'react';
import { LeftNavBar, LeftNavBarProps } from '@hs/components';
import { DashBoardIcon } from '@hs/icons';
import { Route, Switch, useParams } from 'react-router-dom';
import CreateCluster from './CreateCluster';
import Dashboard from './Dashboard';
import { IUrlParamsEntity } from '../../types/ICreateCluster';
const baseUrl = '/clusters';
const navItems: LeftNavBarProps = {
  navList: [
    { linkUrl: `${baseUrl}/create-cluster`, linkText: 'Create clusterx', icon: DashBoardIcon },
    { linkUrl: `${baseUrl}/dashboard`, linkText: 'Cluster Dashboard', icon: DashBoardIcon },
  ],
};

const Cluster: FC = () => {
  const params = useParams<IUrlParamsEntity>();
  return (
    <>
      <LeftNavBar {...navItems}></LeftNavBar>
      <Switch>
        <Route path={`${baseUrl}/dashboard`}>
          <Dashboard />
        </Route>
        <Route path={`${baseUrl}/create-cluster`}>
          <CreateCluster header="Vendor casepack setup" params={params} key={'Create'} />
        </Route>
        <Route path={`${baseUrl}/edit-cluster/:id/:group_id`}>
          <CreateCluster header="Edit Vendor casepack setup" params={params} key={`Edit${Math.random() * 100}`} />
        </Route>
      </Switch>
    </>
  );
};

export default Cluster;
