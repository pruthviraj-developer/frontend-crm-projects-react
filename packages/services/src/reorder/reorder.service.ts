import { httpService } from '../http';
// import queryString from 'query-string';

import {
  ICreateClusterType,
  IReorderCreateConstraintParams,
  IReorderCreateConstraint,
} from '../reorder/Ireorder.service';

const createConstraint = (
  params: IReorderCreateConstraintParams,
  data: ICreateClusterType
): Promise<IReorderCreateConstraint> => {
  // const url = queryString.stringifyUrl({
  //   url: '/crm-api/inventory-mgmt-service/assortment-plan-api/protected/vendor-constraint-service/age-color-constraint',
  //   query: { ...params },
  // });
  // return httpService.post<IReorderCreateConstraint>({ url, data });
  const url =
    '/crm-api/inventory-mgmt-service/assortment-plan-api/protected/vendor-constraint-service/age-color-constraint';
  return httpService.post<IReorderCreateConstraint>({ url, params, data });
};

const getConstraint = <P, R>(params: P): Promise<R> => {
  const url =
    '/crm-api/inventory-mgmt-service/assortment-plan-api/protected/vendor-constraint-service/age-color-constraint';
  return httpService.get<R>({ url, params });
};

const getColors = <R>(): Promise<R> => {
  const url =
    '/crm-api/inventory-mgmt-service/assortment-plan-api/util/vendor-constraint-service/color';
  return httpService.get<R>({ url });
};

const getFilters = <R>(): Promise<R> => {
  const url =
    '/crm-api/inventory-mgmt-service/assortment-plan-api/util/v2/filters';
  return httpService.get<R>({ url });
};

const getSubCategories = <P, R>(data: P): Promise<R> => {
  const url = '/crm-api/inventory-mgmt-service/assortment-plan-api/sub_cats';
  return httpService.post<R>({ url, data });
};

const getProductTypes = <P, R>(data: P): Promise<R> => {
  const url =
    '/crm-api/inventory-mgmt-service/assortment-plan-api/prodcuct_types';
  return httpService.post<R>({ url, data });
};

const getTableData = <P, R>(data: P): Promise<R> => {
  const url =
    '/crm-api/inventory-mgmt-service/assortment-plan-api/reorder-dashboard';
  return httpService.post<R>({ url, data });
};

const updateOrders = <P, R>(data: P): Promise<R> => {
  const url =
    '/crm-api/inventory-mgmt-service/assortment-plan-api/protected/reorder-take-action';
  return httpService.post<R>({ url, data });
};

const getBrands = <P, R>(params: P): Promise<R> => {
  const url = '/crm-api/intranet/getbrandbyvendor';
  return httpService.get<R>({ url, params });
};

const getDashboardData = <P, R>(params?: P): Promise<R> => {
  const url =
    '/crm-api/inventory-mgmt-service/assortment-plan-api/util/dashboard';
  return httpService.get<R>({ url, params });
};

const updateDashboardAction = <P, R>(data: P): Promise<R> => {
  const url =
    '/crm-api/inventory-mgmt-service/assortment-plan-api/protected/vendor-constraint-service/age-color-constraint';
  return httpService.patch({ url, params: { ...data } });
};

export const reorderService = {
  createConstraint,
  getConstraint,
  getColors,
  getFilters,
  getBrands,
  getProductTypes,
  getSubCategories,
  getTableData,
  updateOrders,
  getDashboardData,
  updateDashboardAction,
};
