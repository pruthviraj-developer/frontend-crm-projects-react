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

export interface IDashboardResponse {
  messageList?: string;
  productSubtypeList: DashboardData[] | any;
  status?: string;
  totalCount: number;
}

export interface IProductTypeDropDownProps {
  options?: OptionType[] | null;
  key: string;
  input_type: string;
  apiKey?: string;
  type?: string;
  name?: string;
  label?: string;
  multi?: boolean;
  disabled?: boolean;
  display: string;
  clearFields?: Array<string>;
  display_position: number;
  value?: string;
  attributeName?: string;
  displayName?: string;
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
  fetchTableData?: IPageType;
}

export interface OptionType {
  key: string | number;
  value: string;
  second: string | number;
  first: string | number;
}
export interface ISelectedValues {
  [key: string]: OptionType | string;
}
export declare type IPageType = {
  pageSize: number;
  pageNo: number;
};
