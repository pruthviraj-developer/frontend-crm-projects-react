import { tableParams } from '@hs/services';

export interface TableAction {
  url: string;
  display: string;
}

export interface SelectableTableProps {
  columns: Array<string>;
  rows: Array<Record<string, string>>;
  rowKeys: Array<string>;
  disableExport?: boolean;
  deleteColumn?: (event: (string | Record<string, string>)[]) => void;
  exportColumn?: (event: (string | Record<string, string>)[]) => void;
  fetchTableData: (event: tableParams) => void;
  stableSort?: (array: any, comparator: any) => number;
  onSort?: (a: any, b: any) => void;
  getComparator?: (a: any, b: any) => any;
  tableActions?: TableAction[];
  sortingId?: string;
  selectId?: string;
  sorting?: boolean;
}
