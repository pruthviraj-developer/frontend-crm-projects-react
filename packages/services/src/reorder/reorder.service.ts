import { httpService } from '../http';

const getFilters = <R>(): Promise<R> => {
  const url = '/crm-api/assortment-plan-api/util/v2/filters';
  return httpService.get<R>({ url });
};


const getSubCategories =<P, R>(data: P): Promise<R> => {
  const url = '/crm-api/assortment-plan-api/sub_cats';
  return httpService.post<R>({ url,data });
};

const getTableData = <P, R>(data: P): Promise<R> => {
  const url = '/crm-api/assortment-plan-api/reorder-dashboard';
  return httpService.post<R>({ url, data });
};

const updateOrders = <P, R>(data: P): Promise<R> => {
  const url = '/crm-api/assortment-plan-api/reorder-take-action';
  return httpService.post<R>({ url, data });
};

export const reorderService = {
  getFilters,
  getSubCategories,
  getTableData,
  updateOrders,
};
