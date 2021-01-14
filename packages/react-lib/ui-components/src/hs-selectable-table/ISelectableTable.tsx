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
  rows: Array<Record<string | number, string | number>>;
  rowKeys: Array<string>;
  disableExport?: boolean;
  deleteColumn?: (event: (string | Record<string, string>)[]) => void;
  exportColumn?: (event: (string | Record<string, string>)[]) => void;
  showFilters?: (event: (boolean | Record<string, string>)[]) => void;
  fetchTableData: (event: filterQueryParams) => void;
  stableSort?: (array: any, comparator: any) => number;
  onSort?: (filterQueryParams) => void;
  getComparator?: (a: any, b: any) => any;
  tableActions?: STableAction[];
  sortingId?: string;
  selectId?: string;
  sorting?: boolean;
  rowsPerPageOptions: Array<number>;
  displayRowsPerPage: number;
  totalRowsCount: number;
}
