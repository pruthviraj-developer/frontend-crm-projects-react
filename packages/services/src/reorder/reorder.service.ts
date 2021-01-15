import { httpService } from '../http';
const getTableData = <P, R>(data: P): Promise<R> => {
  const url = '/crm-api/assortment-plan-api/reorder-dashboard/get';
  return httpService.post<R>({ url, data });
};
export const reorderService = {
  getTableData,
};
