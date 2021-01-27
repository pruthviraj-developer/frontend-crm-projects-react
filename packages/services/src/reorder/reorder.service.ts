import { httpService } from '../http';

const getFilters = <R>(): Promise<R> => {
  const url = '/crm-api/assortment-plan-api/reorder-dashboard';
  return httpService.get<R>({ url });
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
  getTableData,
  updateOrders,
};
