import { httpService } from '../http';

const getCategory = <R>(): Promise<R> => {
  const url =
    '/crm-api/inventory-mgmt-service/assortment-plan-api/util/category';
  return httpService.get<R>({ url });
};

const getSubCategory = <P, R>(categoryId: P): Promise<R> => {
  const url =
    '/crm-api/inventory-mgmt-service/assortment-plan-api/util/sub-category';
  const params = { 'category-id': categoryId };
  return httpService.get<R>({ url, params });
};

const getProductType = <P, R>(subcategoryId: P): Promise<R> => {
  const url =
    '/crm-api/inventory-mgmt-service/assortment-plan-api/util/product-type?sub-category-ids=[' +
    subcategoryId +
    ']';
  return httpService.get<R>({ url });
};

const getAttributesList = <P, R>(productTypeId: P): Promise<R> => {
  const url = `/crm-api/intranet/productsubtype/creation-setup/${productTypeId}`;
  return httpService.get<R>({ url });
};

const addProduct = <P, R>(data: P): Promise<R> => {
  const url = '/crm-api/intranet/productsubtype/create';
  return httpService.post<R>({ url, data });
};

const getProduct = <P, R>(Id: P): Promise<R> => {
  const url = `/crm-api/intranet/productsubtype/getapi/${Id}`;
  return httpService.get<R>({ url });
};

const updateProduct = <P, R>(
  data: P,
  subtypeId: string | number
): Promise<R> => {
  const url = `/crm-api/intranet/productsubtype/update/${subtypeId}`;
  return httpService.post<R>({ url, data });
};

const getDashboardData = <P, R>(
  params: Record<symbol, unknown>,
  data: P
): Promise<R> => {
  const url = '/crm-api/intranet/productsubtype/search';
  return httpService.post<R>({ url, params, data });
};

const updateAction = <R>(id: number, data: any): Promise<R> => {
  const url = `/crm-api/intranet/productsubtype/statuschange/${id}`;
  return httpService.post<R>({ url, data });
};

export const productSubtypeService = {
  getCategory,
  getSubCategory,
  getProductType,
  getProduct,
  addProduct,
  updateProduct,
  getAttributesList,
  getDashboardData,
  updateAction,
};
