import { httpService } from '../http';

const createConstraint = <P, R>(data: P): Promise<R> => {
  const url =
    '/crm-api/assortment-plan-api/reorder-take-action/vendor-constraint-service/age-color-constraint';
  return httpService.post<R>({ url, data });
};

const getColors = <R>(): Promise<R> => {
  const url =
    '/crm-api/assortment-plan-api/util/vendor-constraint-service/color';
  return httpService.get<R>({ url });
};

const getFilters = <R>(): Promise<R> => {
  const url = '/crm-api/assortment-plan-api/util/v2/filters';
  return httpService.get<R>({ url });
};

const getSubCategories = <P, R>(data: P): Promise<R> => {
  const url = '/crm-api/assortment-plan-api/sub_cats';
  return httpService.post<R>({ url, data });
};

const getProductTypes = <P, R>(data: P): Promise<R> => {
  const url = '/crm-api/assortment-plan-api/prodcuct_types';
  return httpService.post<R>({ url, data });
};

const getTableData = <P, R>(data: P): Promise<R> => {
  const url = '/crm-api/assortment-plan-api/reorder-dashboard';
  return httpService.post<R>({ url, data });
};

const updateOrders = <P, R>(data: P): Promise<R> => {
  const url = '/crm-api/assortment-plan-api/reorder-take-action';
  return httpService.post<R>({ url, data });
};

const getBrands = <P, R>(params: P): Promise<R> => {
  const url = '/crm-api/intranet/getbrandbyvendor';
  return httpService.get<R>({ url, params });
};

export const reorderService = {
  createConstraint,
  getColors,
  getFilters,
  getBrands,
  getProductTypes,
  getSubCategories,
  getTableData,
  updateOrders,
};
