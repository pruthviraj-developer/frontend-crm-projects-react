import { tableList, tableParams } from '@hs/services';
export interface HsTablePropsV1 {
  title: string;
  count: number;
  columns: Array<Record<string, unknown>>;
  rowsPerPage: number;
  rows: Array<tableList>;
  filterRowsPerPage: Array<number>;
  fetchTableData: (event: tableParams) => void;
  action?: (event: Record<string, unknown>) => void;
}
