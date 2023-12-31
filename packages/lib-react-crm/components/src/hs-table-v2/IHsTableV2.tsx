export type tableRowsV2 = {
  pid_count: number | string;
  status: string;
  priority: string;
  rowSpan?: number;
};

export interface TableAction {
  url: string;
  display: string;
}

export interface HsTableV2Props {
  columns: Array<string>;
  rows: Array<tableRowsV2>;
  disableExport?: boolean;
  exportColumn: (event: tableRowsV2) => void;
  tableActions?: TableAction[];
}
