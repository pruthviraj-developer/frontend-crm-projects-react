import { tableList, tableParams } from '@hs/services';
export interface IHeaderType {
  header: string;
}

export interface INewDashboardData {
  assessibleValue: number;
  boe: string;
  category: string;
  composition: string;
  currencyMultiplier: number;
  duty: string;
  dutyRate: number;
  fabric: string;
  heightOfChild: string;
  hsCode: number;
  igst: string;
  igstRate: number;
  material: string;
  productType: string;
  qty: number;
  shipmentNo: number;
  surcharge: number;
  surchargeRate: number;
  totalFinalDuty: number;
  unitPrice: number;
  vsku: number;
}

export interface INewDashboardDataResponse {
  data: INewDashboardData[];
  action: string;
  message: string | Array<string>;
  status: string;
  totalRecords: number;
}

export declare type IPageType = {
  pageSize: number;
  pageNo: number;
};

export interface ICommonTypes {
  display: string;
  key: string;
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
  action?: (event: Record<string, unknown>) => void;
}

export interface IPostDataType {
  [key: string]: Array<string> | string;
}
