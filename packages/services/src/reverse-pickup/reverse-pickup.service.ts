import { httpService } from '../http';

const getFilterList = <R>(): Promise<R> => {
  const url =
    '/crm-api/intranet/cancel-return-service/get?action=fetch-return-dashboard-filter-populate-data';
  return httpService.get<R>({ url });
};

const getTableData = <P, R>(data: P): Promise<R> => {
  const url =
    '/crm-api/intranet/cancel-return-service/post?action=fetch-return-dashboard-result-data';
  return httpService.post<R>({ url, data });
};

const getSheetUrl = <P, R>(data: P): Promise<R> => {
  const url =
    '/crm-api/intranet/cancel-return-service/post?action=download-return-dashboard-data';
  return httpService.post<R>({ url, data });
};

export const reversepickupService = {
  getFilterList,
  getSheetUrl,
  getTableData,
};
