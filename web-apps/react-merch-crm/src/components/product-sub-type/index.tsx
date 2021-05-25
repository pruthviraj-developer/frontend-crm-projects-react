import React, { FC } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LeftNavBar, LeftNavBarProps } from '@hs/components';
import { DashBoardIcon } from '@hs/icons';
import DashBoard from './Dashboard';
import CreateProduct from './CreateProduct';
const navItems: LeftNavBarProps = {
  navList: [
    { linkUrl: '/product-sub-types/product-subtype', linkText: 'Product SubType Dashboard', icon: DashBoardIcon },
    { linkUrl: '/product-sub-types/create-product', linkText: 'Add Product Subtype', icon: DashBoardIcon },
  ],
};

const ProductSubType: FC = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <LeftNavBar {...navItems}></LeftNavBar>
      <Switch>
        <Redirect exact from="/product-sub-types" to="/product-sub-types/product-subtype" />
        <Route path={`${path}/product-subtype`}>
          <DashBoard />
        </Route>
        <Route path={`${path}/create-product`}>
          <CreateProduct header="Add Product Subtype" key={'Create'} />
        </Route>
        <Route path={`${path}/edit-product-subtype/:cat_id/:subcat_id/:prod_type_id`}>
          <CreateProduct header="Edit Product Subtype" key={'Update'} />
        </Route>
      </Switch>
    </>
  );
};

export default ProductSubType;
