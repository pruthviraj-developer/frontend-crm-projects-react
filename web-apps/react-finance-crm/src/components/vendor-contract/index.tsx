import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import VendorList from './VendorList';
import VendorNewContract from './VendorNewContract';
import { LeftNavBar } from '@hs-crm/components';


function VendorContract() {
    const { path } = useRouteMatch();
    return (
        <div>
            <LeftNavBar></LeftNavBar>
            <Switch>
                <Route exact={true} path={`${path}`}>
                    <VendorList />
                </Route>
                <Route path={`${path}/new`}>
                    <VendorNewContract />
                </Route>
            </Switch>
        </div>
    );
}

export default VendorContract;