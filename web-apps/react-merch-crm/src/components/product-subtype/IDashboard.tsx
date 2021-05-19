export interface DashboardData {
  productCategoryId: number;
  productCategoryName: string;
  productSubCategoryId: number;
  productSubCategoryName: string;
  productSubtypeId: number;
  productSubtypeName: string;
  productTypeId: number;
  productTypeName: string;
  status: string;
}

export interface CategoryType {
  id: string;
  label: string;
  filterRowsPerPage: Array<number>;
}

export interface PropsType {
  activePage: number;
  count: number;
  rowsPerPage: number;
  title: string;
  columns: CategoryType[];
  rows: DashboardData[];
  fetchTableData?: any;
}

export declare type IPageType = {
  pageSize: number;
  pageNo: number;
};

export {};
