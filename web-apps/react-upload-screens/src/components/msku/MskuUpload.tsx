import React, { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { LeftNavBar, LeftNavBarProps } from '@hs/components';
import { DashBoardIcon } from '@hs/icons';
import BulkUploadScreen from '../common/BulkUploadScreen';

const navItems: LeftNavBarProps = {
  navList: [
    { linkUrl: 'create', linkText: 'MSKU Create', icon: DashBoardIcon },
    { linkUrl: 'update', linkText: 'MSKU Update', icon: DashBoardIcon },
    { linkUrl: 'upload-targets', linkText: 'Upload MSKU targets', icon: DashBoardIcon },
    { linkUrl: 'update-targets', linkText: 'Update MSKU targets', icon: DashBoardIcon },
    { linkUrl: 'salesplan-upload', linkText: 'Sales Plan Upload', icon: DashBoardIcon },
  ],
};

const MskuUpload: FC = () => {
  const { path } = useRouteMatch();
  const createDownloadOption = [{ label: 'Download Template', action: 'downloadCreateMsku' }];
  const updateDownloadOption = [
    { label: 'Download current MSKU and taxonomy', action: 'downloadCurrentMsku' },
    { label: 'Download blank template', action: 'downloadCreateMsku' },
  ];

  return (
    <>
      <LeftNavBar {...navItems}></LeftNavBar>
      <Switch>
        <Route path={`${path}/create`}>
          <BulkUploadScreen header="Create New MSKU" uploadAction="createMsku" downloadOption={createDownloadOption} />
        </Route>
        <Route path={`${path}/update`}>
          <BulkUploadScreen
            header="Update Existing MSKU"
            uploadAction="updateMsku"
            downloadOption={updateDownloadOption}
          />
        </Route>
        <Route path={`${path}/upload-targets`}>
          <BulkUploadScreen header="Upload MSKU targets" uploadAction="" downloadOption={[]} />
        </Route>
        <Route path={`${path}/update-targets`}>
          <BulkUploadScreen header="Update MSKU targets" uploadAction="" downloadOption={[]} />
        </Route>
        <Route path={`${path}/salesplan-upload`}>
          <BulkUploadScreen header="Sales Plan Upload" uploadAction="" downloadOption={[]} />
        </Route>
      </Switch>
    </>
  );
};

export default MskuUpload;
