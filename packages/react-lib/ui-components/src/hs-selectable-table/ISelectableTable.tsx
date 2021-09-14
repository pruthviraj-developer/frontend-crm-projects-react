import { ReactChild } from 'react';
export interface STableAction {
  url: string;
  display: string;
}

interface filterQueryParams {
  order: string;
  orderBy: string | number;
  pageSize: number;
  pageNo: number;
}

export interface ChecksBalanceTableToolbarProps {
  numSelected: number;
  rowsSelected: any;
  deleteColumn?: (event: any) => void;
  exportColumn?: (event: any) => void;
  modifySelectedColumns?: (event: any) => void;
  showFilters?: (event: any) => void;
  selectedColumns?: (event: any) => void;
}

export interface SelectableTableProps {
  columns: Array<Record<string, unknown>>;
  rows: Array<any>;
  disableExport?: boolean;
  fetchTableData: (data: any) => void;
  onSort?: (filterQueryParams) => void;
  tableActions?: STableAction[];
  sortingId: string;
  selectId?: string;
  sorting?: boolean;
  rowsPerPageOptions: Array<number>;
  currentPage?: number;
  displayRowsPerPage: number;
  totalRowsCount: number;
  setColumnsWidth?: any;
  tableToolbar?: (numSelected: number, rowsSelected: any) => ReactChild;
}
