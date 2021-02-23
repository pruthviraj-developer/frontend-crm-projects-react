import React, { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { LeftNavBar, LeftNavBarProps } from '@hs/components';
import { DashBoardIcon } from '@hs/icons';
import BulkUploadScreen from '../common/BulkUploadScreen';

const navItems: LeftNavBarProps = {
  navList: [
    { linkUrl: 'create', linkText: 'MSKU Create', icon: DashBoardIcon },
    { linkUrl: 'update', linkText: 'MSKU Update', icon: DashBoardIcon },
  ],
};

const MskuUpload: FC = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <LeftNavBar {...navItems}></LeftNavBar>
      <Switch>
        <Route path={`${path}/create`}>
          <BulkUploadScreen
            header="Create New MSKU"
            downloadBtnTitle="Download Template"
            uploadAction="createMsku"
            downloadAction="downloadCreateMsku"
          />
        </Route>
        <Route path={`${path}/update`}>
          <BulkUploadScreen
            header="Update Existing MSKU"
            downloadBtnTitle="Download current MSKU and taxonomy"
            uploadAction="updateMsku"
            downloadAction="downloadCurrentMsku"
          />
        </Route>
      </Switch>
    </>
  );
};

export default MskuUpload;
