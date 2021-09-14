import { tableParams } from '@hs/services';

export interface RecommendationTableToolbarProps {
  numSelected: number;
  rowsSelected: any;
  deactivate?: (event: any) => void;
  run?: (event: any) => void;
  showFilters?: (event: any) => void;
}

interface IDashboardData {
  id: number;
  rcType: string;
  modelName: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export interface IDashboardDataResponse {
  models: IDashboardData[];
  action: string;
  message?: string | Array<string>;
  totalRecords: number;
  pageSize?: number;
  pageNo?: number;
}
export interface IPostDataType {
  [key: string]: Array<string> | string;
}

export interface IdialogFromSubmit {
  modelIds: number[];
  runDate?: dateFns;
}
export interface IHeaderType {
  header: string;
}

export declare type IPageType = {
  pageSize: number;
  pageNo: number;
};
export interface ITableDataType {
  activePage: number;
  columns: Array<Record<string, unknown>>;
  count: number;
  filterRowsPerPage: Array<number>;
  rows: Array<any> | [];
  rowsPerPage: number;
  title: string;
  fetchTableData: (event: tableParams) => void;
  action?: (event: Record<string, unknown>) => void;
}
