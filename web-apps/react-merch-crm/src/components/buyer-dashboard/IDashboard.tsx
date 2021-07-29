export interface IFilters {
  categoryId: OptionsType;
  subCategoryId: OptionsType;
}
export interface OptionsType {
  id: number;
  name: string;
}
// product types List

export interface IProductsList {
  action: string;
  message?: null;
  params?: null;
  statusCode: number;
  data: IProductsDataList;
}
export interface IProductsDataList {
  totalRecords: number;
  records?: IProductsData[] | null;
}
export interface IProductsData {
  priceBucketIds: string;
  imgUrls?: null;
  pid: string;
  ptName: string;
  pstCount: string;
  mskuCount: string;
  totalGap: string;
}

export interface IProductTypesList {
  action: string;
  message?: null;
  params?: null;
  statusCode: number;
  data: IProductTypesDataList;
}
export interface IProductTypesDataList {
  totalRecords: number;
  records?: IProductTypesData[] | null;
}
export interface IProductTypesData {
  mskuId: number;
  gender: string;
  ageClass: string;
  ptName: string;
  mskuName: string;
  maxWidth: number;
  targetWidth: number;
  currentWidth: number;
  pidRequired: number;
  priceBucket: string;
  discoveryRequired: number;
}
export interface DashboardProps {
  header: string;
}
