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

const addProduct = <P, R>(data: P): Promise<R> => {
  const url = '/crm-api/intranet/productsubtype/save';
  return httpService.post<R>({ url, data });
};

const getAttributes = <P, R>(productSubtypeId: P): Promise<R> => {
  // const url = '/crm-api/productsubtype/get/' + productSubtypeId;
  const url =
    'https://run.mocky.io/v3/d4d620a4-7d71-4f67-8602-d60f8069c234/' +
    productSubtypeId;
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
  addProduct,
  getAttributes,
  getDashboardData,
  updateAction,
};
