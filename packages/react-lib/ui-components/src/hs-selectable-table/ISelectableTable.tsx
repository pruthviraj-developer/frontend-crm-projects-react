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
  exportColumn?: (event: Record<string, string>) => void;
  fetchTableData: (event: tableParams) => void;
  tableActions?: TableAction[];
  sortingId?: string;
  selectId?: string;
}
