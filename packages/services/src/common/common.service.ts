import { httpService } from '../http';

const getCategory = <T>(): Promise<T> => {
  const url = '/crm-api/intranet/category/getAll';
  return httpService.get<T>({ url });
};

const getSubCategory = <P, R>(categoryId: P): Promise<R> => {
  const url =`/crm-api/intranet/getsubcategory/${categoryId}`;
  return httpService.get<R>({ url });
};

const getProductTypes = <P, R>(subCategoryId: P): Promise<R> => {
  const url = `/crm-api/intranet/getproductclass/${subCategoryId}`;
  return httpService.get<R>({ url });
};

export const commonService = {
  getCategory,
  getSubCategory,
  getProductTypes,
};
