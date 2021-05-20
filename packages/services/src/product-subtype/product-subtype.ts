import { httpService } from '../http';
import queryString from 'query-string';

const getCategory = <R>(): Promise<R> => {
  const url = '/crm-api/assortment-plan-api/util/category';
  return httpService.get<R>({ url });
};

const getSubCategory = <P, R>(categoryId: P): Promise<R> => {
  const url =
    '/crm-api/assortment-plan-api/util/sub-category?category-id=' + categoryId;
  return httpService.get<R>({ url });
};

const getProductType = <P, R>(subcategoryId: P): Promise<R> => {
  const url =
    '/crm-api/assortment-plan-api/util/product-type?sub-category-ids=[' +
    subcategoryId +
    ']';
  return httpService.get<R>({ url });
};

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

export const productSubtypeService = {
  getCategory,
  getSubCategory,
  getProductType,
  getDashboardData,
  updateAction,
};
