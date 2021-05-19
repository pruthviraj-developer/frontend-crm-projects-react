import { httpService } from '../http';
import queryString from 'query-string';

const getDashboardData = <P, R>(
  params: Record<symbol, unknown>,
  data: P
): Promise<R> => {
  const url = queryString.stringifyUrl({
    url: '/crm-api/intranet/productsubtype/search',
    query: { ...params },
  });
  return httpService.post<R>({ url, data });
};

const updateAction = <R>(id: number, data: any): Promise<R> => {
  const url = `/crm-api/intranet/productsubtype/changestatus/${id}`;
  return httpService.post<R>({ url, data });
};

export const productSubtypeService = { getDashboardData, updateAction };
