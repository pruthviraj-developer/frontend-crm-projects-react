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

export interface SelectableTableProps {
  columns: Array<string>;
  rows: Array<any>;
  rowKeys: Array<string>;
  disableExport?: boolean;
  deleteColumn?: (event: (string | Record<string, string>)[]) => void;
  exportColumn?: (event: (string | Record<string, string>)[]) => void;
  modifySelectedColumns?: (event: (string | Record<string, string>)[]) => void;
  showFilters?: (event: (boolean | Record<string, string>)[]) => void;
  fetchTableData: (data: any) => void;
  stableSort?: (array: any, comparator: any) => number;
  onSort?: (filterQueryParams) => void;
  getComparator?: (a: any, b: any) => any;
  tableActions?: STableAction[];
  sortingId?: string;
  selectId?: string;
  sorting?: boolean;
  rowsPerPageOptions: Array<number>;
  currentPage?: number;
  displayRowsPerPage: number;
  totalRowsCount: number;
  setColumnsWidth?: any;
}
