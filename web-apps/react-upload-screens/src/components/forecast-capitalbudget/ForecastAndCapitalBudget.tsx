import React, { FC } from 'react';
import { LeftNavBar, LeftNavBarProps } from '@hs-crm/components';
import { DashBoardIcon } from '@hs/icons';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import BulkUploadScreen from '../common/BulkUploadScreen';

const navItems: LeftNavBarProps = {
  navList: [
    { linkUrl: 'forecast', linkText: 'Upload Forecast File', icon: DashBoardIcon },
    { linkUrl: 'capitalBudget', linkText: 'Upload Capital Budget File', icon: DashBoardIcon },
  ],
};

const ForecastAndCapitalBudget: FC = () => {
  const { path } = useRouteMatch();
  const forecastDownloadOption = [{ label: 'Download Forecast Template', action: 'downloadForecastTemplate' }];
  const capitalBudgetDownloadOption = [
    { label: 'Download Revenue Plan Template', action: 'downloadCapitalBudgetTemplate' },
  ];

  return (
    <>
      <LeftNavBar {...navItems}></LeftNavBar>
      <Switch>
        <Route path={`${path}/forecast`}>
          <BulkUploadScreen
            header="Forecast Data Upload"
            uploadAction="uploadForecastData"
            downloadOption={forecastDownloadOption}
          />
        </Route>
        <Route path={`${path}/capitalBudget`}>
          <BulkUploadScreen
            header="Capital Budget Data Upload"
            uploadAction="uploadCapitalBudgetData"
            downloadOption={capitalBudgetDownloadOption}
          />
        </Route>
      </Switch>
    </>
  );
};

export default ForecastAndCapitalBudget;
