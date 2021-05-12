import { httpService } from '../http';

const createConstraint = <P, R>(data: P): Promise<R> => {
  const url =
    '/crm-api/assortment-plan-api/reorder-take-action/vendor-constraint-service/age-color-constraint';
  return httpService.post<R>({ url, data });
};

const getConstraint = <P, R>(params: P): Promise<R> => {
  const url =
    '/crm-api/assortment-plan-api/reorder-take-action/vendor-constraint-service/age-color-constraint';
  return httpService.get<R>({ url, params });
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

const getDashboardData = <P, R>(params?: P): Promise<R> => {
  const url = 'https://run.mocky.io/v3/1075b672-b091-429a-999e-c3f6d963b434';
  // const url = 'https://run.mocky.io/v3/7d297837-c723-4071-b1a3-f15085627445';
  return httpService.get<R>({ url, params });
};

const getDashboardFilteredData = <P, R>(params?: P): Promise<R> => {
  const url = '/crm-api/intranet/getdashboardbyfilter';
  return httpService.get<R>({ url, params });
};

const updateDashboardAction = <P, R>(data: P): Promise<R> => {
  const url =
    '/assortment-plan-api/reorder-take-action/vendor-constraint-service/age-color-constraint';
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
  getDashboardFilteredData,
  updateDashboardAction,
};
