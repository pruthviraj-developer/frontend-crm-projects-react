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
  return (
    <>
      <LeftNavBar {...navItems}></LeftNavBar>
      <Switch>
        <Route path={`${path}/create`}>
          <BulkUploadScreen
            header="Create New MSKU"
            downloadBtnLabel="Download Template"
            uploadAction="createMsku"
            downloadAction="downloadCreateMsku"
          />
        </Route>
        <Route path={`${path}/update`}>
          <BulkUploadScreen
            header="Update Existing MSKU"
            downloadBtnLabel="Download current MSKU and taxonomy"
            uploadAction="updateMsku"
            downloadAction="downloadCurrentMsku"
          />
        </Route>
        <Route path={`${path}/upload-targets`}>
          <BulkUploadScreen
            header="Bulk upload MSKU Benchmarks"
            downloadBtnLabel="Download template"
            uploadAction="upload"
            downloadAction="downloadupload"
          />
        </Route>
        <Route path={`${path}/update-targets`}>
          <BulkUploadScreen
            header="Bulk Update MSKU Benchmarks"
            downloadBtnLabel="Download latest MSKU targets file, Download template"
            uploadAction="upload"
            downloadAction="downloadupload"
          />
        </Route>
        <Route path={`${path}/salesplan-upload`}>
          <BulkUploadScreen
            header="Sales Plan Upload"
            downloadBtnLabel="DOWNLOAD TEMPLATE"
            uploadAction="upload"
            downloadAction="downloadupload"
          />
        </Route>
      </Switch>
    </>
  );
};

export default MskuUpload;
