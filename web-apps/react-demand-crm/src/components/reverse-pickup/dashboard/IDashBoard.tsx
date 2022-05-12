import { tableParams } from '@hs/services';
import { FilterPanDataType } from '@hs-crm/components';

interface IDashboardData {
  orderId: number;
  trackingNumber: string;
  courierPartner: string;
  hsku: string;
  displayOrderCode: string;
  place?: string;
  warehouse: string;
  status: string;
  lastUpdatedDate: string;
  totalUnits: string;
  returnedUnits: string;
  returnType: string;
  returnReason: string;
  receivingZone: string;
}

interface IDashboDataardResponse {
  dashboardDetails: IDashboardData[];
  totalRecords: number;
  pageSize?: number;
  pageNo?: number;
}

export interface IDashboardResponse {
  data: IDashboDataardResponse;
  action: string;
  message?: string | Array<string>;
}
export interface IPostDataType {
  [key: string]: Array<string> | string;
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

export interface IListFilter {
  hopscotchFilter: FilterPanDataType[];
  thirdPartyFilter: FilterPanDataType[];
}
export interface IFilterDataResponse {
  data: IListFilter;
  action: string;
  message?: string | Array<string>;
}
