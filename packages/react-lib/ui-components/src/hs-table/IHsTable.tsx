import { tableList } from '@hs/services';
export interface HsTableProps {
  title: string;
  count: number;
  columns: Array<Record<string, unknown>>;
  rowsPerPage: number;
  rows: Array<tableList>;
  filterRowsPerPage: Array<number>;
  fetchTableData: (event: Record<string, unknown>) => void;
  action?: (event: Record<string, unknown>) => void;
}
