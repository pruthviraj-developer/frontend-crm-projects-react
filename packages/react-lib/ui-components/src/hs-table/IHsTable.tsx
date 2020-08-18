export interface TableProps {
  title: string;
  columns: Array<Record<string, unknown>>;
  data: Array<Record<string, unknown>>;
  fetchTableData: (event: Record<string, unknown>) => void;
}
