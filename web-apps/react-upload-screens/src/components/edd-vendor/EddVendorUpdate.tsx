import React, { FC } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { LeftNavBar, LeftNavBarProps } from '@hs-crm/components';
import { UploadIcon } from '@hs/icons';
import UploadScreen from './UploadScreen';

const navItems: LeftNavBarProps = {
  navList: [{ linkUrl: 'edd-update', linkText: 'Edd Update', icon: UploadIcon }],
};

const EddVendorUpdate: FC = () => {
  const { path } = useRouteMatch();
  const createDownloadOption = [{ label: 'Download Template', action: '' }];
  return (
    <>
      <LeftNavBar {...navItems}></LeftNavBar>
      <Route path={`${path}/edd-update`}>
        <UploadScreen header="EDD Update" uploadAction="createMsku" downloadOption={createDownloadOption} />
      </Route>
    </>
  );
};

export default EddVendorUpdate;
