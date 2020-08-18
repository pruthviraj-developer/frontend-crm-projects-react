export interface HsTableProps {
  title: string;
  count: number;
  columns: Array<Record<string, unknown>>;
  rowsPerPage: number;
  rows: Array<Record<string, unknown>>;
  filterRowsPerPage: Array<number>;
  fetchTableData: (event: Record<string, unknown>) => void;
}
