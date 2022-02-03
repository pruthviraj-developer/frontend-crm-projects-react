import React, { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { LeftNavBar, LeftNavBarProps } from '@hs-crm/components';
import { DashBoardIcon, CreateIcon, ArchiveIcon, UploadIcon } from '@hs/icons';
import BulkUploadScreen from '../common/BulkUploadScreen';

const navItems: LeftNavBarProps = {
  navList: [
    { linkUrl: 'create', linkText: 'MSKU Create', icon: CreateIcon },
    { linkUrl: 'update', linkText: 'MSKU Update', icon: ArchiveIcon },
    { linkUrl: 'upload-targets', linkText: 'Upload MSKU targets', icon: UploadIcon },
    { linkUrl: 'update-targets', linkText: 'Update MSKU targets', icon: DashBoardIcon },
    { linkUrl: 'salesplan-upload', linkText: 'Sales Plan Upload', icon: UploadIcon },
    { linkUrl: 'thirdparty-salesplan-upload', linkText: '3P Sales Plan Upload', icon: UploadIcon },
  ],
};

const MskuUpload: FC = () => {
  const { path } = useRouteMatch();
  const createDownloadOption = [{ label: 'Download Template', action: 'downloadCreateMsku' }];
  const updateDownloadOption = [
    { label: 'Download current MSKU and taxonomy', action: 'downloadCurrentMsku' },
    { label: 'Download blank template', action: 'downloadUpdateMsku' },
  ];
  const uploadTargetDownloadOption = [{ label: 'Download Template', action: 'downloadCreateMskuTarget' }];
  const updateTargetDownloadOption = [
    { label: 'Download latest MSKU targets file', action: 'downloadMskuTarget' },
    { label: 'Download Template', action: 'downloadUpdateMskuTarget' },
  ];
  const salesPlanDownloadOption = [{ label: 'Download Template', action: 'downloadMskuTargetSalePlan' }];
  const salesPlanDownload3POption = [{ label: 'Download Template', action: 'downloadMskuTarget3PSalePlan' }];

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
          <BulkUploadScreen
            header="Bulk Upload MSKU Benchmarks"
            uploadAction="createMskuTarget"
            downloadOption={uploadTargetDownloadOption}
          />
        </Route>
        <Route path={`${path}/update-targets`}>
          <BulkUploadScreen
            header="Bulk Update MSKU Benchmarks"
            uploadAction="updateMskuTarget"
            downloadOption={updateTargetDownloadOption}
          />
        </Route>
        <Route path={`${path}/salesplan-upload`}>
          <BulkUploadScreen
            header="Sales Plan Upload"
            uploadAction="createMskuTargetSalePlan"
            downloadOption={salesPlanDownloadOption}
          />
        </Route>
        <Route path={`${path}/thirdparty-salesplan-upload`}>
          <BulkUploadScreen
            header="3P Sales Plan Upload"
            uploadAction="createMskuTarget3PSalePlan"
            downloadOption={salesPlanDownload3POption}
          />
        </Route>
      </Switch>
    </>
  );
};

export default MskuUpload;
