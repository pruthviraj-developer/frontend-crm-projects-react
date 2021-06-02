import React, { FC } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LeftNavBar, LeftNavBarProps } from '@hs/components';
import { DashBoardIcon } from '@hs/icons';
import DashBoard from './Dashboard';
import CreateProduct from './CreateProduct';
const navItems: LeftNavBarProps = {
  navList: [
    { linkUrl: '/product-sub-types/product-sub-type', linkText: 'Product SubType Dashboard', icon: DashBoardIcon },
    { linkUrl: '/product-sub-types/create-product', linkText: 'Create Product Subtype', icon: DashBoardIcon },
  ],
};

const ProductSubType: FC = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <LeftNavBar {...navItems}></LeftNavBar>
      <Switch>
        <Redirect exact from="/product-sub-types" to="/product-sub-types/dash-board" />
        <Route path={`${path}/dash-board`}>
          <DashBoard />
        </Route>
        <Route path={`${path}/create-product`}>
          <CreateProduct header="Create Product Subtype" key={'Create'} />
        </Route>
        <Route path={`${path}/edit-product-subtype/:id`}>
          <CreateProduct header="Edit Product Subtype" key={'Update'} />
        </Route>
        <Redirect to="/product-sub-types/dash-board" />
      </Switch>
    </>
  );
};

export default ProductSubType;
