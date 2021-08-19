import React, { FC } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LeftNavBar, LeftNavBarProps } from '@hs-crm/components';
import { DashBoardIcon } from '@hs/icons';
import DashBoard from './Dashboard';
import UploadScreen from './UploadScreen';
const navItems: LeftNavBarProps = {
  navList: [
    { linkUrl: '/custom-duty/dashboard', linkText: 'Custom Duty Dashboard', icon: DashBoardIcon },
    { linkUrl: '/custom-duty/upload-screen', linkText: 'Custom Duty File Upload', icon: DashBoardIcon },
  ],
};

const ProductSubType: FC = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <LeftNavBar {...navItems}></LeftNavBar>
      <Switch>
        <Redirect exact from="/custom-duty" to="/custom-duty/dashboard" />
        <Route path={`${path}/dashboard`}>
          <DashBoard header="Custom Duty Dashboard" />
        </Route>
        <Route path={`${path}/upload-screen`}>
          <UploadScreen header="Custom Duty File Upload" />
        </Route>
        <Redirect to="/custom-duty/dashboard" />
      </Switch>
    </>
  );
};

export default ProductSubType;
