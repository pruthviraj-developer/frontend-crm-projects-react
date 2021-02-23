import React, { FC } from 'react';
import { LeftNavBar, LeftNavBarProps } from '@hs/components';
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
  return (
    <>
      <LeftNavBar {...navItems}></LeftNavBar>
      <Switch>
        <Route path={`${path}/forecast`}>
          <BulkUploadScreen
            header="Forecast Data Upload"
            downloadBtnTitle="Download Forecast Template"
            uploadAction="uploadForecastData"
            downloadAction="downloadForecastTemplate"
          />
        </Route>
        <Route path={`${path}/capitalBudget`}>
          <BulkUploadScreen
            header="Capital Budget Data Upload"
            downloadBtnTitle="Download Revenue Plan Template"
            uploadAction="uploadCapitalBudgetData"
            downloadAction="downloadCapitalBudgetTemplate"
          />
        </Route>
      </Switch>
    </>
  );
};

export default ForecastAndCapitalBudget;
