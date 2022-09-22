import { tableParams } from '@hs/services';
export interface ISummaryDashboard {
  warehouseReturnedQuantityFinalStatus?: IWarehouseReturnedQuantityFinalStatusEntityProps[] | null;
}
export interface IWarehouseReturnedQuantityFinalStatusEntityProps {
  type: string;
  totalQuantity: number;
  wheQuantity: number;
  bngQuantity: number;
  kolQuantity: number;
  ndlQuantity: number;
}

export interface ISummaryDashboardResponse {
  data: ISummaryDashboard;
  action: string;
  message?: string | Array<string>;
}

export interface ITableDataType {
  activePage: number;
  columns: Array<Record<string, unknown>>;
  count: number;
  filterRowsPerPage: Array<number>;
  rows: Array<any> | [];
  rowsPerPage: number;
  title: string;
  fetchTableData: (event: tableParams) => void;
}

export interface IHeaderType {
  header: string;
}

export declare type IPageType = {
  pageSize: number;
  pageNo: number;
};
